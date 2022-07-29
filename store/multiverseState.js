import Vue from 'vue'
import { hasOwnProperty } from '~/assets/lib/hasOwnProperty'
import { WebSocketFactory } from '~/assets/lib/WebSocketFactory'
import { decodePacket } from '~/assets/proto/ProtoUtil.ts'

/** @type Object<Number, WebSocket> */
const webSockets = {} // multiverseId → ws

export const state = () => ({
  multiverses: {},
})

const ensureMultiverseExists = (state, multiverseId) => {
  if (!hasOwnProperty(state.multiverses, multiverseId)) {
    Vue.set(state.multiverses, multiverseId, {
      id: multiverseId,
      universes: [],
      spectators: [],
      bingoBoard: null,
      bingoUniverses: [],
      markedBingoGoals: [],
      seed: null,
      locked: false,
    })
  }
}

export const getters = {}

export const mutations = {
  setBingoBoard(state, { multiverseId, board }) {
    ensureMultiverseExists(state, multiverseId)
    state.multiverses[multiverseId].bingoBoard = board
  },
  setUniverses(state, { multiverseId, universes }) {
    ensureMultiverseExists(state, multiverseId)
    state.multiverses[multiverseId].universes = universes
  },
  setSpectators(state, { multiverseId, spectators }) {
    ensureMultiverseExists(state, multiverseId)
    state.multiverses[multiverseId].spectators = spectators
  },
  setBingoUniverses(state, { multiverseId, bingoUniverses }) {
    ensureMultiverseExists(state, multiverseId)
    state.multiverses[multiverseId].bingoUniverses = bingoUniverses
  },
  setMultiverseLocked(state, { multiverseId, locked }) {
    ensureMultiverseExists(state, multiverseId)
    state.multiverses[multiverseId].locked = locked
  },
  setSeed(state, { multiverseId, seed }) {
    state.multiverses[multiverseId].seed = seed
  },
  toggleBingoGoalMarked(state, { multiverseId, x, y }) {
    if (state.multiverses[multiverseId].markedBingoGoals.some(m => m.x === x && m.y === y)) {
      state.multiverses[multiverseId].markedBingoGoals = state.multiverses[multiverseId].markedBingoGoals.filter(m => (
        m.x !== x || m.y !== y
      ))
      return
    }

    state.multiverses[multiverseId].markedBingoGoals.push({ x, y })
  },
}

export const actions = {
  async fetchMultiverse({ commit, dispatch }, multiverseId) {
    const multiverse = await this.$axios.$get(`/multiverses/${multiverseId}`)
    commit('setUniverses', { multiverseId, universes: multiverse.universes })
    commit('setSpectators', { multiverseId, spectators: multiverse.spectators })
    commit('setMultiverseLocked', { multiverseId, locked: multiverse.locked })

    if (multiverse.seedId !== null) {
      await dispatch('fetchSeed', { multiverseId, seedId: multiverse.seedId })
    }

    if (multiverse.hasBingoBoard) {
      await dispatch('fetchBingoBoard', multiverseId)
    }
  },
  async fetchSeed({ commit }, { multiverseId, seedId }) {
    try {
      const seed = await this.$axios.$get(`/seeds/${seedId}`)
      commit('setSeed', {
        multiverseId,
        seed,
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchBingoBoard({ commit }, multiverseId) {
    let board = null
    let bingoUniverses = []

    try {
      const response = await this.$axios.$get(`/bingo/${multiverseId}`)
      board = response.board
      bingoUniverses = response.universes ?? []
    } catch (e) {
      if (e.response.status !== 404) {
        console.error(e)
      } else {
        console.log('No bingo board available for multiverse', multiverseId)
      }
    }

    commit('setBingoBoard', { multiverseId, board })
    commit('setBingoUniverses', { multiverseId, bingoUniverses })
  },
  async connectMultiverse({ commit, dispatch, getters }, { multiverseId, reconnect = false, retries = 0 }) {
    let ws = webSockets[multiverseId] ?? null

    if (retries >= 20) {
      throw new Error('Max number of retries exceeded')
    }

    const retryConnection = () => setTimeout(() => {
      dispatch('connectMultiverse', { multiverseId, retries: retries + 1 })
        .catch(error => {
          throw error
        })
    }, 1000 * (retries + 1))

    if (reconnect || (ws?.readyState !== WebSocket.OPEN && ws?.readyState !== WebSocket.CONNECTING)) {
      ws?.close()

      try {
        webSockets[multiverseId] = await WebSocketFactory.create(`/observers/${multiverseId}`, this.$paths)
        ws = webSockets[multiverseId]
      } catch (e) {
        retryConnection()
        return
      }

      retries = 0

      ws.addEventListener('close', () => {
        retryConnection()
      })
      ws.addEventListener('message', async event => {
        const packet = await decodePacket(event.data)

        if (!packet) {
          return
        }

        switch (packet.$type) {
          case 'RandoProto.SyncBoardMessage':
            commit('setBingoBoard', { multiverseId, board: packet.board })
            break
          case 'RandoProto.MultiverseInfoMessage':
            commit('setUniverses', { multiverseId, universes: packet.universes })
            commit('setSpectators', { multiverseId, spectators: packet.spectators })
            commit('setMultiverseLocked', { multiverseId, locked: packet.locked })
            break
          case 'RandoProto.SyncBingoUniversesMessage':
            commit('setBingoUniverses', { multiverseId, bingoUniverses: packet.bingoUniverses })
            break
        }
      })
    }
  },
  async spectateMultiverse({ commit, dispatch }, multiverseId) {
    await this.$axios.post(`/multiverses/${multiverseId}/spectators`)
    await dispatch('fetchMultiverse', multiverseId)
    await dispatch('connectMultiverse', { multiverseId, reconnect: true })
  },
}
