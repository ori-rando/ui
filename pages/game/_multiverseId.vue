<template>
  <div>
    <v-container>
      <div class='d-flex justify-center align-center mt-12 mb-6'>
        <v-tooltip top open-delay='500'>
          <template #activator='{on}'>
            <v-btn class='ml-2' :disabled='!canLock || lockGameLoading' icon v-on='on' @click='toggleGameLock'>
              <v-icon :class='isLocked ? "lock-animation" : "unlock-animation"'>{{ isLocked ? 'mdi-lock' : 'mdi-lock-open-outline' }}</v-icon>
            </v-btn>
          </template>
          <span v-if='canLock'>{{ isLocked ? 'Unlock' : 'Lock' }} this game</span>
          <span v-else>This game is {{ isLocked ? 'locked' : 'unlocked' }}</span>
        </v-tooltip>
        <h1 class='text-center mx-4'>
          Game <small>#</small>{{ multiverseId }}
        </h1>
        <v-tooltip top open-delay='500'>
          <template #activator='{on}'>
            <v-btn v-on='on' icon :disabled='gameLinkCopied' @click='copyGameLink'>
              <v-icon>{{ gameLinkCopied ? 'mdi-clipboard-check-outline' : 'mdi-link' }}</v-icon>
            </v-btn>
          </template>
          <span>Copy game link</span>
        </v-tooltip>
      </div>

      <div class='text-center my-6'>
        <v-tooltip bottom>
          <template #activator='{on}'>
            <v-btn
              v-if='!isElectron'
              v-on='on'
              color='accent'
              x-large
              @click='openInLauncher'
            >
              <v-icon left>mdi-launch</v-icon>
              Open in Launcher
            </v-btn>
          </template>
          <span><kbd>Ctrl</kbd> + Click to close this window</span>
        </v-tooltip>
      </div>

      <throttled-spinner>
        <div v-if='isLoggedIn && multiverseReady'>
          <wotw-multiverse-view :multiverse='multiverse' />
        </div>
        <div v-if='!isLoggedIn && userLoaded' class='text-center'>
          <v-alert class='d-inline-block' color='error darken-3'>
            <template v-if='isOBS'>
              <b>DO NOT</b> add this page to OBS directly. Please use the "Embed" feature above the board.
            </template>
            <template v-else>
              You need to be logged in to view this game.
            </template>
          </v-alert>
        </div>
      </throttled-spinner>
    </v-container>

    <template v-if='isLoggedIn && multiverseReady && !!multiverse.bingoBoard'>
      <v-container>
        <h2 class='text-center mb-3 mt-8'>Bingo board</h2>

        <div class='text-center mb-1'>
          <v-btn text @click='centerBoard'>
            <template v-if='showBoard'>
              <v-icon left>mdi-image-filter-center-focus-strong-outline</v-icon>
              Center on screen
            </template>
            <template v-else>
              <v-icon left>mdi-eye-outline</v-icon>
              Show board
            </template>
          </v-btn>
          <v-btn text @click='boardSettingsOpen = true'>
            <v-icon left>mdi-cog-outline</v-icon>
            Settings
          </v-btn>
          <v-btn
            v-if='isElectron'
            :disabled='bingoOverlayEnabled'
            text
            @click='enableBingoOverlay'
          >
            <template v-if='bingoOverlayEnabled'>
              <v-icon left>mdi-check</v-icon>
              Overlay enabled
            </template>
            <template v-else>
              <v-icon left>mdi-semantic-web</v-icon>
             Enable Overlay
            </template>
          </v-btn>
          <v-btn
            :disabled='embedUrlCopied'
            :loading='embedUrlLoading'
            text
            @click='createEmbedUrl'
          >
            <template v-if='embedUrlCopied'>
              <v-icon left>mdi-check</v-icon>
              URL Copied
            </template>
            <template v-else>
              <v-icon left>mdi-semantic-web</v-icon>
              Embed (OBS)
            </template>
          </v-btn>
          <v-btn :disabled='isSpectating' text @click='spectateDialogOpen = true'>
            <v-icon left>mdi-monitor-eye</v-icon>
            Spectate
          </v-btn>
        </div>
      </v-container>

      <div ref='boardContainer' :class='{"px-1": !boardSettings.obsMode}' class='board-container'>
        <template v-if='showBoard'>
          <wotw-bingo-board
            :edge-labels='boardSettings.edgeLabels'
            :multiverse='multiverse'
            :hidden-universes='hiddenUniverses'
            :highlight-universe='highlightedUniverseId'
            :own-universe-id='ownUniverseId'
            :card-attention-effect='boardSettings.cardAttentionEffect'
            class='board'
          />
          <div class='sidebar px-5'>
            <transition-group class='bingo-universes' name='list'>
              <div
                v-for='(bingoUniverse, index) in sortedBingoUniverses'
                :key='bingoUniverse.universeId'
                :style='{zIndex: sortedBingoUniverses.length - index}'
                class='relative'
              >
                <wotw-bingo-universe-view
                  :bingo-universe='bingoUniverse'
                  :universe='multiverse.universes.find(u => u.id === bingoUniverse.universeId)'
                  :universe-hidden='hiddenUniverses.includes(bingoUniverse.universeId)'
                  @click='toggleUniverseVisibility(bingoUniverse.universeId)'
                  @click.native.ctrl.capture.stop='toggleUniverseVisibility(bingoUniverse.universeId, true)'
                />
              </div>

              <div
                v-if='!boardSettings.hideSpectators && multiverse.spectators.length > 0'
                key='spectators'
                class='mt-4'
              >
                <div class='text-caption'>Spectators</div>

                <v-tooltip v-for='spectator in multiverse.spectators' :key='spectator.id' top>
                  <span>{{ spectator.name }}</span>
                  <template #activator='{on}'>
                    <span v-on='on'>
                      <discord-avatar :user='spectator' />
                    </span>
                  </template>
                </v-tooltip>
              </div>
            </transition-group>
          </div>
        </template>
      </div>

      <v-dialog v-model='boardSettingsOpen' max-width='500'>
        <v-card class='pa-5 relative'>
          <h2>Bingo settings</h2>

          <v-btn
            class='close-button'
            color='background lighten-5'
            icon
            @click='boardSettingsOpen = false'
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-checkbox
            v-model='boardSettings.edgeLabels'
            hint='Show coordinates around the board'
            label='Edge Labels'
            persistent-hint
          />

          <v-checkbox
            v-model='boardSettings.highlightOwnUniverse'
            hint='Reserve bottom left parts of bingo squares for your team. Greatly improves overview of your progress.'
            label='Highlight own team'
            persistent-hint
          />

          <v-checkbox
            v-model='boardSettings.hideSpectators'
            hint='Hide spectators from the player list next to the board'
            label='Hide spectators'
            persistent-hint
          />

          <v-checkbox
            v-model='boardSettings.cardAttentionEffect'
            hint='Flash cards when their value changes'
            label='Flash cards'
            persistent-hint
          />
        </v-card>
      </v-dialog>

      <v-dialog v-model='spectateDialogOpen' :persistent='spectateLoading' max-width='500'>
        <v-card class='pa-5 relative'>
          <h2>Spectate this game</h2>

          Spectating the game lets you see all squares that have been discovered
          by at least one team.<br>
          Please note that you <b>cannot join this game anymore</b> after you
          chose to spectate.

          <div class='d-flex justify-end'>
            <v-btn :disabled='spectateLoading' class='mr-1' text @click='spectateDialogOpen = false'>
              Cancel
            </v-btn>
            <v-btn :loading='spectateLoading' color='accent' depressed @click='spectate'>
              Spectate
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { isElectron } from '~/assets/lib/isElectron'
  import { applyTransparentWindowStyles, isOBS } from '~/assets/lib/obs'

  export default {
    name: 'GamePage',
    data: () => ({
      loading: false,
      embedUrlLoading: false,
      embedUrlCopied: false,
      gameLinkCopied: false,
      multiverseReady: false,
      showBoard: false,
      hiddenUniverses: [], // Array of team IDs
      boardSettingsOpen: false,
      boardSettings: {
        edgeLabels: false,
        highlightOwnUniverse: true,
        hideSpectators: false,
        cardAttentionEffect: true,
      },
      spectateDialogOpen: false,
      spectateLoading: false,
      seedgenResultVisible: false,
      hideSeedgenResultCompletely: false,
      bingoOverlayEnabled: false,
      lockGameLoading: false,
    }),
    computed: {
      ...mapGetters('user', ['isLoggedIn']),
      ...mapState('user', ['user', 'userLoaded']),
      ...mapState('multiverseState', ['multiverses']),
      isElectron,
      isOBS() {
        return isOBS()
      },
      multiverseId() {
        return Number(this.$route.params.multiverseId)
      },
      multiverse() {
        return this.multiverses[this.multiverseId]
      },
      sortedBingoUniverses() {
        if (!this.multiverse) {
          return []
        }

        // Only return bingo teams for which we have a team
        const universes = this.multiverse.universes
        return [
          ...this.multiverse.bingoUniverses.filter(b => universes.some(u => u.id === b.universeId)),
        ].sort((a, b) => {
          const rankDifference = b.rank - a.rank

          if (rankDifference === 0) {
            return a.universeId - b.universeId
          }

          return rankDifference
        })
      },
      canCreateUniverse() {
        return this.multiverse.universes.length < 8
      },
      ownUniverse() {
        return this.multiverse.universes.find(
          universe => universe.worlds.find(
            world => world.members.find(
              player => player.id === this.user?.id,
            ),
          ),
        )
      },
      ownUniverseId() {
        return this.ownUniverse?.id
      },
      highlightedUniverseId() {
        if (!this.boardSettings.highlightOwnUniverse || this.multiverse.universes.length <= 1) {
          return null
        }

        return this.ownUniverseId
      },
      isSpectating() {
        if (!this.multiverse || !this.user) {
          return false
        }

        return this.multiverse.spectators.some(s => s.id === this.user.id)
      },
      launcherUrl() {
        return `ori-rando://game/${this.multiverseId}`
      },
      isBingoBoardOverlay() {
        return this.$route.query.isBingoBoardOverlay === 'true'
      },
      isPlayer() {
        return this.multiverse?.universes.some(u => u.worlds.some(w => w.members.some(m => m.id === this.user.id))) ?? false
      },
      canLock() {
        return this.isPlayer
      },
      isLocked() {
        return this.multiverse?.locked
      }
    },
    watch: {
      userLoaded: {
        immediate: true,
        handler(userLoaded) {
          if (userLoaded && !this.isLoggedIn) {
            if (this.$route.query.jwt) {
              this.$store.commit('auth/setJwt', this.$route.query.jwt)
              this.$store.dispatch('user/updateUser')
            }
          }
        },
      },
      isLoggedIn: {
        immediate: true,
        async handler(isLoggedIn) {
          if (isLoggedIn) {
            await this.$store.dispatch('multiverseState/fetchMultiverse', this.multiverseId)
            await this.$store.dispatch('multiverseState/connectMultiverse', {
              multiverseId: this.multiverseId,
            })
            this.multiverseReady = true
          }
        },
      },
      boardSettings: {
        deep: true,
        handler(boardSettings) {
          window.localStorage.setItem('boardSettings', JSON.stringify(boardSettings))
        },
      },
      // Probably solved?
      // 'multiverse.universes'() { // TO DO: Temporary workaround for orirando/wotw-server#5
      //   if (this.multiverse.bingoBoard) {
      //     this.$store.dispatch('multiverseState/fetchBingoBoard', this.multiverseId)
      //   }
      // },
      multiverseReady: {
        immediate: true,
        handler(multiverseReady) {
          if (multiverseReady && this.multiverse.bingoBoard) {
            this.$nextTick(() => {
              if (isOBS() || this.isBingoBoardOverlay) {
                applyTransparentWindowStyles()
                this.centerBoard()
              }
            })
          }
        },
      },
    },
    mounted() {
      try {
        this.boardSettings = {
          ...this.boardSettings,
          ...JSON.parse(window.localStorage.getItem('boardSettings')),
        }
      } catch (e) {
        console.error('Could not load board settings', e)
      }

      // if (this.seedgenResult) {
      //   this.seedgenResultVisible = true
      //   this.seedgenResultDialogEnabled = true
      //   setTimeout(() => {
      //     this.seedgenResultVisible = false
      //   }, 600)
      // }

      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      async join(worldId) {
        await this.$axios.post(`/multiverses/${this.multiverseId}/worlds/${worldId}`)
        await this.$store.dispatch('multiverseState/connectMultiverse', {
          multiverseId: this.multiverseId,
          reconnect: true,
        })
      },
      async createWorld(universeId = null) {
        await this.$axios.post(`/multiverses/${this.multiverseId}/${universeId}/worlds`)
      },
      centerBoard() {
        this.$refs.boardContainer.scrollIntoView({
          behavior: this.showBoard ? 'smooth' : 'auto',
          block: 'start',
        })
        this.showBoard = true
      },
      toggleUniverseVisibility(universeId, exclusive = false) {
        if (exclusive) {
          if (this.hiddenUniverses.length === this.sortedBingoUniverses.length - 1 && !this.hiddenUniverses.includes(universeId)) {
            this.hiddenUniverses = []
          } else {
            this.hiddenUniverses = this.sortedBingoUniverses.map(b => b.universeId).filter(u => u !== universeId)
          }
        } else if (this.hiddenUniverses.includes(universeId)) {
          this.hiddenUniverses = this.hiddenUniverses.filter(u => u !== universeId)
        } else {
          this.hiddenUniverses.push(universeId)
        }
      },
      async createEmbedUrl() {
        this.embedUrlLoading = true

        const token = await this.$axios.$post('/tokens/', {
          scopes: ['boards.read', 'user.info.read'],
        })

        const targetRoute = this.$router.resolve({
          name: 'game-multiverseId',
          params: {
            multiverseId: this.multiverseId,
          },
          query: {
            jwt: token,
          },
        })

        const url = new URL(targetRoute.href.replace('/#', ''), this.$paths.UI_BASE_URL)
        await window.navigator.clipboard.writeText(url.toString())

        this.embedUrlLoading = false

        this.embedUrlCopied = true

        setTimeout(() => {
          this.embedUrlCopied = false
        }, 4000)
      },
      async copyGameLink() {
        const url = new URL(`/game/${this.multiverseId}`, this.$paths.UI_BASE_URL)
        await navigator.clipboard.writeText(url.toString())
        this.gameLinkCopied = true

        setTimeout(() => {
          this.gameLinkCopied = false
        }, 3000)
      },
      async spectate() {
        this.spectateLoading = true

        try {
          await this.$store.dispatch('multiverseState/spectateMultiverse', this.multiverseId)
          this.spectateDialogOpen = false
        } catch (e) {
          console.error(e)
        }

        this.spectateLoading = false
      },
      onScroll() {
        this.hideSeedgenResultCompletely = document.scrollingElement.scrollTop > 200
      },
      async enableBingoOverlay() {
        await window.electronApi.invoke('bingoBoardOverlay.prepare', this.multiverseId)
        this.bingoOverlayEnabled = true

        setTimeout(() => {
          this.bingoOverlayEnabled = false
        }, 5000)
      },
      openInLauncher(event) {
        window.open(this.launcherUrl, '_self')

        if (event.ctrlKey) {
          setTimeout(() => {
            window.close()
          }, 500)
        }
      },
      async toggleGameLock() {
        if (this.lockGameLoading) {
          return
        }

        this.lockGameLoading = true

        try {
          await this.$axios.post(`/multiverses/${this.multiverseId}/toggle-lock`)
        } catch (e) {
          console.error(e)
        }

        this.lockGameLoading = false
      },
    },
  }
</script>

<style lang='scss' scoped>
  .universes {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    justify-content: center;

    .universe-view {
      min-width: 15vw;
    }
  }

  .board-container {
    display: flex;
    min-height: 100vh;

    .board {
      flex-grow: 0;
      flex-shrink: 0;
      height: 100vh;
      width: 100vh;
    }

    .sidebar {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;

      .bingo-universes {
        display: flex;
        flex-direction: column;
        gap: 0.3em;
        justify-content: stretch;
      }
    }
  }

  .relative {
    .close-button {
      position: absolute;
      right: 1em;
      top: 1em;
      z-index: 10;
    }
  }

  @keyframes lock-animation {
    0% {
      transform: translateY(0);
    }

    25% {
      transform: translateY(5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes unlock-animation {
    0% {
      transform: translateY(0);
    }

    25% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  .lock-animation {
    animation: lock-animation 0.25s forwards ease-out;
  }

  .unlock-animation {
    animation: unlock-animation 0.25s forwards ease-out;
  }
</style>
