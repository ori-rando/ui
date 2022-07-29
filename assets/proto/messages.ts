/* eslint-disable */
import { messageTypeRegistry } from './typeRegistry'
import Long from 'long'
import _m0 from 'protobufjs/minimal'

export const protobufPackage = 'RandoProto'

export interface Packet {
  $type: 'RandoProto.Packet'
  id: number
  packet: Uint8Array
}

export interface BingoGoal {
  $type: 'RandoProto.BingoGoal'
  text: string
  completed: boolean
}

export interface UserInfo {
  $type: 'RandoProto.UserInfo'
  id: string
  name: string
  avatarId?: string | undefined
  connectedMultiverseId?: number | undefined
  currentMultiverseId?: number | undefined
  isDeveloper: boolean
}

export interface WorldInfo {
  $type: 'RandoProto.WorldInfo'
  id: number
  name: string
  color: string
  members: UserInfo[]
  seedFile?: string | undefined
}

export interface UniverseInfo {
  $type: 'RandoProto.UniverseInfo'
  id: number
  name: string
  color: string
  worlds: WorldInfo[]
}

export interface MultiverseInfoMessage {
  $type: 'RandoProto.MultiverseInfoMessage'
  id: number
  universes: UniverseInfo[]
  hasBingoBoard: boolean
  spectators: UserInfo[]
  seedId?: number | undefined
  locked: boolean
}

export interface BingoSquare {
  $type: 'RandoProto.BingoSquare'
  text: string
  completedBy: number[]
  goals: BingoGoal[]
}

export interface RequestUpdatesMessage {
  $type: 'RandoProto.RequestUpdatesMessage'
  playerId: string
}

export interface BingoUniverseInfo {
  $type: 'RandoProto.BingoUniverseInfo'
  universeId: number
  score: string
  rank: number
  squares: number
  lines: number
}

export interface SyncBingoUniversesMessage {
  $type: 'RandoProto.SyncBingoUniversesMessage'
  bingoUniverses: BingoUniverseInfo[]
}

export interface Position {
  $type: 'RandoProto.Position'
  x: number
  y: number
}

export interface PositionedBingoSquare {
  $type: 'RandoProto.PositionedBingoSquare'
  position: Position | undefined
  square: BingoSquare | undefined
}

export interface BingoBoard {
  $type: 'RandoProto.BingoBoard'
  squares: PositionedBingoSquare[]
  size: number
  lockout: boolean
}

export interface SyncBoardMessage {
  $type: 'RandoProto.SyncBoardMessage'
  board: BingoBoard | undefined
  replace: boolean
}

export interface AuthenticateMessage {
  $type: 'RandoProto.AuthenticateMessage'
  jwt: string
}

/** Unused in web */
export interface AuthenticatedMessage {
  $type: 'RandoProto.AuthenticatedMessage'
  user: UserInfo | undefined
  udpId: number
  udpKey: Uint8Array
}

export interface PlayerPositionMessage {
  $type: 'RandoProto.PlayerPositionMessage'
  x: number
  y: number
}

export interface UpdatePlayerPositionMessage {
  $type: 'RandoProto.UpdatePlayerPositionMessage'
  playerId: string
  x: number
  y: number
}

export interface UdpPacket {
  $type: 'RandoProto.UdpPacket'
  udpId: number
  encryptedPacket: Uint8Array
}

/** 100 */
export interface TrackerUpdate {
  $type: 'RandoProto.TrackerUpdate'
  id: string
  value: number
}

/** 101 */
export interface ResetTracker {
  $type: 'RandoProto.ResetTracker'
}

/** 102 */
export interface TrackerFlagsUpdate {
  $type: 'RandoProto.TrackerFlagsUpdate'
  flags: string[]
}

/** 103 */
export interface RequestFullUpdate {
  $type: 'RandoProto.RequestFullUpdate'
}

/** 104 */
export interface SetTrackerEndpointId {
  $type: 'RandoProto.SetTrackerEndpointId'
  endpointId: string
}

function createBasePacket(): Packet {
  return { $type: 'RandoProto.Packet', id: 0, packet: new Uint8Array() }
}

export const Packet = {
  $type: 'RandoProto.Packet' as const,

  encode(message: Packet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id)
    }
    if (message.packet.length !== 0) {
      writer.uint32(18).bytes(message.packet)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasePacket()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32()
          break
        case 2:
          message.packet = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Packet {
    return {
      $type: Packet.$type,
      id: isSet(object.id) ? Number(object.id) : 0,
      packet: isSet(object.packet) ? bytesFromBase64(object.packet) : new Uint8Array(),
    }
  },

  toJSON(message: Packet): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    message.packet !== undefined && (obj.packet = base64FromBytes(message.packet !== undefined ? message.packet : new Uint8Array()))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<Packet>, I>>(object: I): Packet {
    const message = createBasePacket()
    message.id = object.id ?? 0
    message.packet = object.packet ?? new Uint8Array()
    return message
  },
}

messageTypeRegistry.set(Packet.$type, Packet)

function createBaseBingoGoal(): BingoGoal {
  return { $type: 'RandoProto.BingoGoal', text: '', completed: false }
}

export const BingoGoal = {
  $type: 'RandoProto.BingoGoal' as const,

  encode(message: BingoGoal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== '') {
      writer.uint32(10).string(message.text)
    }
    if (message.completed === true) {
      writer.uint32(16).bool(message.completed)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BingoGoal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBingoGoal()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string()
          break
        case 2:
          message.completed = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BingoGoal {
    return {
      $type: BingoGoal.$type,
      text: isSet(object.text) ? String(object.text) : '',
      completed: isSet(object.completed) ? Boolean(object.completed) : false,
    }
  },

  toJSON(message: BingoGoal): unknown {
    const obj: any = {}
    message.text !== undefined && (obj.text = message.text)
    message.completed !== undefined && (obj.completed = message.completed)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BingoGoal>, I>>(object: I): BingoGoal {
    const message = createBaseBingoGoal()
    message.text = object.text ?? ''
    message.completed = object.completed ?? false
    return message
  },
}

messageTypeRegistry.set(BingoGoal.$type, BingoGoal)

function createBaseUserInfo(): UserInfo {
  return {
    $type: 'RandoProto.UserInfo',
    id: '',
    name: '',
    avatarId: undefined,
    connectedMultiverseId: undefined,
    currentMultiverseId: undefined,
    isDeveloper: false,
  }
}

export const UserInfo = {
  $type: 'RandoProto.UserInfo' as const,

  encode(message: UserInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.avatarId !== undefined) {
      writer.uint32(26).string(message.avatarId)
    }
    if (message.connectedMultiverseId !== undefined) {
      writer.uint32(32).int64(message.connectedMultiverseId)
    }
    if (message.currentMultiverseId !== undefined) {
      writer.uint32(40).int64(message.currentMultiverseId)
    }
    if (message.isDeveloper === true) {
      writer.uint32(48).bool(message.isDeveloper)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUserInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.avatarId = reader.string()
          break
        case 4:
          message.connectedMultiverseId = longToNumber(reader.int64() as Long)
          break
        case 5:
          message.currentMultiverseId = longToNumber(reader.int64() as Long)
          break
        case 6:
          message.isDeveloper = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UserInfo {
    return {
      $type: UserInfo.$type,
      id: isSet(object.id) ? String(object.id) : '',
      name: isSet(object.name) ? String(object.name) : '',
      avatarId: isSet(object.avatarId) ? String(object.avatarId) : undefined,
      connectedMultiverseId: isSet(object.connectedMultiverseId) ? Number(object.connectedMultiverseId) : undefined,
      currentMultiverseId: isSet(object.currentMultiverseId) ? Number(object.currentMultiverseId) : undefined,
      isDeveloper: isSet(object.isDeveloper) ? Boolean(object.isDeveloper) : false,
    }
  },

  toJSON(message: UserInfo): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.avatarId !== undefined && (obj.avatarId = message.avatarId)
    message.connectedMultiverseId !== undefined && (obj.connectedMultiverseId = Math.round(message.connectedMultiverseId))
    message.currentMultiverseId !== undefined && (obj.currentMultiverseId = Math.round(message.currentMultiverseId))
    message.isDeveloper !== undefined && (obj.isDeveloper = message.isDeveloper)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UserInfo>, I>>(object: I): UserInfo {
    const message = createBaseUserInfo()
    message.id = object.id ?? ''
    message.name = object.name ?? ''
    message.avatarId = object.avatarId ?? undefined
    message.connectedMultiverseId = object.connectedMultiverseId ?? undefined
    message.currentMultiverseId = object.currentMultiverseId ?? undefined
    message.isDeveloper = object.isDeveloper ?? false
    return message
  },
}

messageTypeRegistry.set(UserInfo.$type, UserInfo)

function createBaseWorldInfo(): WorldInfo {
  return { $type: 'RandoProto.WorldInfo', id: 0, name: '', color: '', members: [], seedFile: undefined }
}

export const WorldInfo = {
  $type: 'RandoProto.WorldInfo' as const,

  encode(message: WorldInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.color !== '') {
      writer.uint32(26).string(message.color)
    }
    for (const v of message.members) {
      UserInfo.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    if (message.seedFile !== undefined) {
      writer.uint32(42).string(message.seedFile)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorldInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseWorldInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.color = reader.string()
          break
        case 4:
          message.members.push(UserInfo.decode(reader, reader.uint32()))
          break
        case 5:
          message.seedFile = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): WorldInfo {
    return {
      $type: WorldInfo.$type,
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : '',
      color: isSet(object.color) ? String(object.color) : '',
      members: Array.isArray(object?.members) ? object.members.map((e: any) => UserInfo.fromJSON(e)) : [],
      seedFile: isSet(object.seedFile) ? String(object.seedFile) : undefined,
    }
  },

  toJSON(message: WorldInfo): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    message.name !== undefined && (obj.name = message.name)
    message.color !== undefined && (obj.color = message.color)
    if (message.members) {
      obj.members = message.members.map((e) => (e ? UserInfo.toJSON(e) : undefined))
    } else {
      obj.members = []
    }
    message.seedFile !== undefined && (obj.seedFile = message.seedFile)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<WorldInfo>, I>>(object: I): WorldInfo {
    const message = createBaseWorldInfo()
    message.id = object.id ?? 0
    message.name = object.name ?? ''
    message.color = object.color ?? ''
    message.members = object.members?.map((e) => UserInfo.fromPartial(e)) || []
    message.seedFile = object.seedFile ?? undefined
    return message
  },
}

messageTypeRegistry.set(WorldInfo.$type, WorldInfo)

function createBaseUniverseInfo(): UniverseInfo {
  return { $type: 'RandoProto.UniverseInfo', id: 0, name: '', color: '', worlds: [] }
}

export const UniverseInfo = {
  $type: 'RandoProto.UniverseInfo' as const,

  encode(message: UniverseInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.color !== '') {
      writer.uint32(26).string(message.color)
    }
    for (const v of message.worlds) {
      WorldInfo.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UniverseInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUniverseInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.color = reader.string()
          break
        case 4:
          message.worlds.push(WorldInfo.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UniverseInfo {
    return {
      $type: UniverseInfo.$type,
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : '',
      color: isSet(object.color) ? String(object.color) : '',
      worlds: Array.isArray(object?.worlds) ? object.worlds.map((e: any) => WorldInfo.fromJSON(e)) : [],
    }
  },

  toJSON(message: UniverseInfo): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    message.name !== undefined && (obj.name = message.name)
    message.color !== undefined && (obj.color = message.color)
    if (message.worlds) {
      obj.worlds = message.worlds.map((e) => (e ? WorldInfo.toJSON(e) : undefined))
    } else {
      obj.worlds = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UniverseInfo>, I>>(object: I): UniverseInfo {
    const message = createBaseUniverseInfo()
    message.id = object.id ?? 0
    message.name = object.name ?? ''
    message.color = object.color ?? ''
    message.worlds = object.worlds?.map((e) => WorldInfo.fromPartial(e)) || []
    return message
  },
}

messageTypeRegistry.set(UniverseInfo.$type, UniverseInfo)

function createBaseMultiverseInfoMessage(): MultiverseInfoMessage {
  return { $type: 'RandoProto.MultiverseInfoMessage', id: 0, universes: [], hasBingoBoard: false, spectators: [], seedId: undefined, locked: false }
}

export const MultiverseInfoMessage = {
  $type: 'RandoProto.MultiverseInfoMessage' as const,

  encode(message: MultiverseInfoMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id)
    }
    for (const v of message.universes) {
      UniverseInfo.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.hasBingoBoard === true) {
      writer.uint32(24).bool(message.hasBingoBoard)
    }
    for (const v of message.spectators) {
      UserInfo.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    if (message.seedId !== undefined) {
      writer.uint32(40).int64(message.seedId)
    }
    if (message.locked === true) {
      writer.uint32(72).bool(message.locked)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiverseInfoMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMultiverseInfoMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.universes.push(UniverseInfo.decode(reader, reader.uint32()))
          break
        case 3:
          message.hasBingoBoard = reader.bool()
          break
        case 4:
          message.spectators.push(UserInfo.decode(reader, reader.uint32()))
          break
        case 5:
          message.seedId = longToNumber(reader.int64() as Long)
          break
        case 9:
          message.locked = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MultiverseInfoMessage {
    return {
      $type: MultiverseInfoMessage.$type,
      id: isSet(object.id) ? Number(object.id) : 0,
      universes: Array.isArray(object?.universes) ? object.universes.map((e: any) => UniverseInfo.fromJSON(e)) : [],
      hasBingoBoard: isSet(object.hasBingoBoard) ? Boolean(object.hasBingoBoard) : false,
      spectators: Array.isArray(object?.spectators) ? object.spectators.map((e: any) => UserInfo.fromJSON(e)) : [],
      seedId: isSet(object.seedId) ? Number(object.seedId) : undefined,
      locked: isSet(object.locked) ? Boolean(object.locked) : false,
    }
  },

  toJSON(message: MultiverseInfoMessage): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    if (message.universes) {
      obj.universes = message.universes.map((e) => (e ? UniverseInfo.toJSON(e) : undefined))
    } else {
      obj.universes = []
    }
    message.hasBingoBoard !== undefined && (obj.hasBingoBoard = message.hasBingoBoard)
    if (message.spectators) {
      obj.spectators = message.spectators.map((e) => (e ? UserInfo.toJSON(e) : undefined))
    } else {
      obj.spectators = []
    }
    message.seedId !== undefined && (obj.seedId = Math.round(message.seedId))
    message.locked !== undefined && (obj.locked = message.locked)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<MultiverseInfoMessage>, I>>(object: I): MultiverseInfoMessage {
    const message = createBaseMultiverseInfoMessage()
    message.id = object.id ?? 0
    message.universes = object.universes?.map((e) => UniverseInfo.fromPartial(e)) || []
    message.hasBingoBoard = object.hasBingoBoard ?? false
    message.spectators = object.spectators?.map((e) => UserInfo.fromPartial(e)) || []
    message.seedId = object.seedId ?? undefined
    message.locked = object.locked ?? false
    return message
  },
}

messageTypeRegistry.set(MultiverseInfoMessage.$type, MultiverseInfoMessage)

function createBaseBingoSquare(): BingoSquare {
  return { $type: 'RandoProto.BingoSquare', text: '', completedBy: [], goals: [] }
}

export const BingoSquare = {
  $type: 'RandoProto.BingoSquare' as const,

  encode(message: BingoSquare, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== '') {
      writer.uint32(10).string(message.text)
    }
    writer.uint32(18).fork()
    for (const v of message.completedBy) {
      writer.int64(v)
    }
    writer.ldelim()
    for (const v of message.goals) {
      BingoGoal.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BingoSquare {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBingoSquare()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string()
          break
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.completedBy.push(longToNumber(reader.int64() as Long))
            }
          } else {
            message.completedBy.push(longToNumber(reader.int64() as Long))
          }
          break
        case 3:
          message.goals.push(BingoGoal.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BingoSquare {
    return {
      $type: BingoSquare.$type,
      text: isSet(object.text) ? String(object.text) : '',
      completedBy: Array.isArray(object?.completedBy) ? object.completedBy.map((e: any) => Number(e)) : [],
      goals: Array.isArray(object?.goals) ? object.goals.map((e: any) => BingoGoal.fromJSON(e)) : [],
    }
  },

  toJSON(message: BingoSquare): unknown {
    const obj: any = {}
    message.text !== undefined && (obj.text = message.text)
    if (message.completedBy) {
      obj.completedBy = message.completedBy.map((e) => Math.round(e))
    } else {
      obj.completedBy = []
    }
    if (message.goals) {
      obj.goals = message.goals.map((e) => (e ? BingoGoal.toJSON(e) : undefined))
    } else {
      obj.goals = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BingoSquare>, I>>(object: I): BingoSquare {
    const message = createBaseBingoSquare()
    message.text = object.text ?? ''
    message.completedBy = object.completedBy?.map((e) => e) || []
    message.goals = object.goals?.map((e) => BingoGoal.fromPartial(e)) || []
    return message
  },
}

messageTypeRegistry.set(BingoSquare.$type, BingoSquare)

function createBaseRequestUpdatesMessage(): RequestUpdatesMessage {
  return { $type: 'RandoProto.RequestUpdatesMessage', playerId: '' }
}

export const RequestUpdatesMessage = {
  $type: 'RandoProto.RequestUpdatesMessage' as const,

  encode(message: RequestUpdatesMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playerId !== '') {
      writer.uint32(10).string(message.playerId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestUpdatesMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRequestUpdatesMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.playerId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RequestUpdatesMessage {
    return {
      $type: RequestUpdatesMessage.$type,
      playerId: isSet(object.playerId) ? String(object.playerId) : '',
    }
  },

  toJSON(message: RequestUpdatesMessage): unknown {
    const obj: any = {}
    message.playerId !== undefined && (obj.playerId = message.playerId)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RequestUpdatesMessage>, I>>(object: I): RequestUpdatesMessage {
    const message = createBaseRequestUpdatesMessage()
    message.playerId = object.playerId ?? ''
    return message
  },
}

messageTypeRegistry.set(RequestUpdatesMessage.$type, RequestUpdatesMessage)

function createBaseBingoUniverseInfo(): BingoUniverseInfo {
  return { $type: 'RandoProto.BingoUniverseInfo', universeId: 0, score: '', rank: 0, squares: 0, lines: 0 }
}

export const BingoUniverseInfo = {
  $type: 'RandoProto.BingoUniverseInfo' as const,

  encode(message: BingoUniverseInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.universeId !== 0) {
      writer.uint32(8).int64(message.universeId)
    }
    if (message.score !== '') {
      writer.uint32(26).string(message.score)
    }
    if (message.rank !== 0) {
      writer.uint32(32).int32(message.rank)
    }
    if (message.squares !== 0) {
      writer.uint32(40).int32(message.squares)
    }
    if (message.lines !== 0) {
      writer.uint32(48).int32(message.lines)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BingoUniverseInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBingoUniverseInfo()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.universeId = longToNumber(reader.int64() as Long)
          break
        case 3:
          message.score = reader.string()
          break
        case 4:
          message.rank = reader.int32()
          break
        case 5:
          message.squares = reader.int32()
          break
        case 6:
          message.lines = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BingoUniverseInfo {
    return {
      $type: BingoUniverseInfo.$type,
      universeId: isSet(object.universeId) ? Number(object.universeId) : 0,
      score: isSet(object.score) ? String(object.score) : '',
      rank: isSet(object.rank) ? Number(object.rank) : 0,
      squares: isSet(object.squares) ? Number(object.squares) : 0,
      lines: isSet(object.lines) ? Number(object.lines) : 0,
    }
  },

  toJSON(message: BingoUniverseInfo): unknown {
    const obj: any = {}
    message.universeId !== undefined && (obj.universeId = Math.round(message.universeId))
    message.score !== undefined && (obj.score = message.score)
    message.rank !== undefined && (obj.rank = Math.round(message.rank))
    message.squares !== undefined && (obj.squares = Math.round(message.squares))
    message.lines !== undefined && (obj.lines = Math.round(message.lines))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BingoUniverseInfo>, I>>(object: I): BingoUniverseInfo {
    const message = createBaseBingoUniverseInfo()
    message.universeId = object.universeId ?? 0
    message.score = object.score ?? ''
    message.rank = object.rank ?? 0
    message.squares = object.squares ?? 0
    message.lines = object.lines ?? 0
    return message
  },
}

messageTypeRegistry.set(BingoUniverseInfo.$type, BingoUniverseInfo)

function createBaseSyncBingoUniversesMessage(): SyncBingoUniversesMessage {
  return { $type: 'RandoProto.SyncBingoUniversesMessage', bingoUniverses: [] }
}

export const SyncBingoUniversesMessage = {
  $type: 'RandoProto.SyncBingoUniversesMessage' as const,

  encode(message: SyncBingoUniversesMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bingoUniverses) {
      BingoUniverseInfo.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SyncBingoUniversesMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSyncBingoUniversesMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.bingoUniverses.push(BingoUniverseInfo.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SyncBingoUniversesMessage {
    return {
      $type: SyncBingoUniversesMessage.$type,
      bingoUniverses: Array.isArray(object?.bingoUniverses) ? object.bingoUniverses.map((e: any) => BingoUniverseInfo.fromJSON(e)) : [],
    }
  },

  toJSON(message: SyncBingoUniversesMessage): unknown {
    const obj: any = {}
    if (message.bingoUniverses) {
      obj.bingoUniverses = message.bingoUniverses.map((e) => (e ? BingoUniverseInfo.toJSON(e) : undefined))
    } else {
      obj.bingoUniverses = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SyncBingoUniversesMessage>, I>>(object: I): SyncBingoUniversesMessage {
    const message = createBaseSyncBingoUniversesMessage()
    message.bingoUniverses = object.bingoUniverses?.map((e) => BingoUniverseInfo.fromPartial(e)) || []
    return message
  },
}

messageTypeRegistry.set(SyncBingoUniversesMessage.$type, SyncBingoUniversesMessage)

function createBasePosition(): Position {
  return { $type: 'RandoProto.Position', x: 0, y: 0 }
}

export const Position = {
  $type: 'RandoProto.Position' as const,

  encode(message: Position, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(8).int32(message.x)
    }
    if (message.y !== 0) {
      writer.uint32(16).int32(message.y)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Position {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasePosition()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.x = reader.int32()
          break
        case 2:
          message.y = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Position {
    return {
      $type: Position.$type,
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    }
  },

  toJSON(message: Position): unknown {
    const obj: any = {}
    message.x !== undefined && (obj.x = Math.round(message.x))
    message.y !== undefined && (obj.y = Math.round(message.y))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<Position>, I>>(object: I): Position {
    const message = createBasePosition()
    message.x = object.x ?? 0
    message.y = object.y ?? 0
    return message
  },
}

messageTypeRegistry.set(Position.$type, Position)

function createBasePositionedBingoSquare(): PositionedBingoSquare {
  return { $type: 'RandoProto.PositionedBingoSquare', position: undefined, square: undefined }
}

export const PositionedBingoSquare = {
  $type: 'RandoProto.PositionedBingoSquare' as const,

  encode(message: PositionedBingoSquare, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(10).fork()).ldelim()
    }
    if (message.square !== undefined) {
      BingoSquare.encode(message.square, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionedBingoSquare {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasePositionedBingoSquare()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.position = Position.decode(reader, reader.uint32())
          break
        case 2:
          message.square = BingoSquare.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PositionedBingoSquare {
    return {
      $type: PositionedBingoSquare.$type,
      position: isSet(object.position) ? Position.fromJSON(object.position) : undefined,
      square: isSet(object.square) ? BingoSquare.fromJSON(object.square) : undefined,
    }
  },

  toJSON(message: PositionedBingoSquare): unknown {
    const obj: any = {}
    message.position !== undefined && (obj.position = message.position ? Position.toJSON(message.position) : undefined)
    message.square !== undefined && (obj.square = message.square ? BingoSquare.toJSON(message.square) : undefined)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<PositionedBingoSquare>, I>>(object: I): PositionedBingoSquare {
    const message = createBasePositionedBingoSquare()
    message.position = object.position !== undefined && object.position !== null ? Position.fromPartial(object.position) : undefined
    message.square = object.square !== undefined && object.square !== null ? BingoSquare.fromPartial(object.square) : undefined
    return message
  },
}

messageTypeRegistry.set(PositionedBingoSquare.$type, PositionedBingoSquare)

function createBaseBingoBoard(): BingoBoard {
  return { $type: 'RandoProto.BingoBoard', squares: [], size: 0, lockout: false }
}

export const BingoBoard = {
  $type: 'RandoProto.BingoBoard' as const,

  encode(message: BingoBoard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.squares) {
      PositionedBingoSquare.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.size !== 0) {
      writer.uint32(16).int32(message.size)
    }
    if (message.lockout === true) {
      writer.uint32(24).bool(message.lockout)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BingoBoard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBingoBoard()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.squares.push(PositionedBingoSquare.decode(reader, reader.uint32()))
          break
        case 2:
          message.size = reader.int32()
          break
        case 3:
          message.lockout = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BingoBoard {
    return {
      $type: BingoBoard.$type,
      squares: Array.isArray(object?.squares) ? object.squares.map((e: any) => PositionedBingoSquare.fromJSON(e)) : [],
      size: isSet(object.size) ? Number(object.size) : 0,
      lockout: isSet(object.lockout) ? Boolean(object.lockout) : false,
    }
  },

  toJSON(message: BingoBoard): unknown {
    const obj: any = {}
    if (message.squares) {
      obj.squares = message.squares.map((e) => (e ? PositionedBingoSquare.toJSON(e) : undefined))
    } else {
      obj.squares = []
    }
    message.size !== undefined && (obj.size = Math.round(message.size))
    message.lockout !== undefined && (obj.lockout = message.lockout)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BingoBoard>, I>>(object: I): BingoBoard {
    const message = createBaseBingoBoard()
    message.squares = object.squares?.map((e) => PositionedBingoSquare.fromPartial(e)) || []
    message.size = object.size ?? 0
    message.lockout = object.lockout ?? false
    return message
  },
}

messageTypeRegistry.set(BingoBoard.$type, BingoBoard)

function createBaseSyncBoardMessage(): SyncBoardMessage {
  return { $type: 'RandoProto.SyncBoardMessage', board: undefined, replace: false }
}

export const SyncBoardMessage = {
  $type: 'RandoProto.SyncBoardMessage' as const,

  encode(message: SyncBoardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.board !== undefined) {
      BingoBoard.encode(message.board, writer.uint32(10).fork()).ldelim()
    }
    if (message.replace === true) {
      writer.uint32(16).bool(message.replace)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SyncBoardMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSyncBoardMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.board = BingoBoard.decode(reader, reader.uint32())
          break
        case 2:
          message.replace = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SyncBoardMessage {
    return {
      $type: SyncBoardMessage.$type,
      board: isSet(object.board) ? BingoBoard.fromJSON(object.board) : undefined,
      replace: isSet(object.replace) ? Boolean(object.replace) : false,
    }
  },

  toJSON(message: SyncBoardMessage): unknown {
    const obj: any = {}
    message.board !== undefined && (obj.board = message.board ? BingoBoard.toJSON(message.board) : undefined)
    message.replace !== undefined && (obj.replace = message.replace)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SyncBoardMessage>, I>>(object: I): SyncBoardMessage {
    const message = createBaseSyncBoardMessage()
    message.board = object.board !== undefined && object.board !== null ? BingoBoard.fromPartial(object.board) : undefined
    message.replace = object.replace ?? false
    return message
  },
}

messageTypeRegistry.set(SyncBoardMessage.$type, SyncBoardMessage)

function createBaseAuthenticateMessage(): AuthenticateMessage {
  return { $type: 'RandoProto.AuthenticateMessage', jwt: '' }
}

export const AuthenticateMessage = {
  $type: 'RandoProto.AuthenticateMessage' as const,

  encode(message: AuthenticateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jwt !== '') {
      writer.uint32(10).string(message.jwt)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseAuthenticateMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.jwt = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AuthenticateMessage {
    return {
      $type: AuthenticateMessage.$type,
      jwt: isSet(object.jwt) ? String(object.jwt) : '',
    }
  },

  toJSON(message: AuthenticateMessage): unknown {
    const obj: any = {}
    message.jwt !== undefined && (obj.jwt = message.jwt)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticateMessage>, I>>(object: I): AuthenticateMessage {
    const message = createBaseAuthenticateMessage()
    message.jwt = object.jwt ?? ''
    return message
  },
}

messageTypeRegistry.set(AuthenticateMessage.$type, AuthenticateMessage)

function createBaseAuthenticatedMessage(): AuthenticatedMessage {
  return { $type: 'RandoProto.AuthenticatedMessage', user: undefined, udpId: 0, udpKey: new Uint8Array() }
}

export const AuthenticatedMessage = {
  $type: 'RandoProto.AuthenticatedMessage' as const,

  encode(message: AuthenticatedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      UserInfo.encode(message.user, writer.uint32(10).fork()).ldelim()
    }
    if (message.udpId !== 0) {
      writer.uint32(16).int32(message.udpId)
    }
    if (message.udpKey.length !== 0) {
      writer.uint32(26).bytes(message.udpKey)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticatedMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseAuthenticatedMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.user = UserInfo.decode(reader, reader.uint32())
          break
        case 2:
          message.udpId = reader.int32()
          break
        case 3:
          message.udpKey = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AuthenticatedMessage {
    return {
      $type: AuthenticatedMessage.$type,
      user: isSet(object.user) ? UserInfo.fromJSON(object.user) : undefined,
      udpId: isSet(object.udpId) ? Number(object.udpId) : 0,
      udpKey: isSet(object.udpKey) ? bytesFromBase64(object.udpKey) : new Uint8Array(),
    }
  },

  toJSON(message: AuthenticatedMessage): unknown {
    const obj: any = {}
    message.user !== undefined && (obj.user = message.user ? UserInfo.toJSON(message.user) : undefined)
    message.udpId !== undefined && (obj.udpId = Math.round(message.udpId))
    message.udpKey !== undefined && (obj.udpKey = base64FromBytes(message.udpKey !== undefined ? message.udpKey : new Uint8Array()))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticatedMessage>, I>>(object: I): AuthenticatedMessage {
    const message = createBaseAuthenticatedMessage()
    message.user = object.user !== undefined && object.user !== null ? UserInfo.fromPartial(object.user) : undefined
    message.udpId = object.udpId ?? 0
    message.udpKey = object.udpKey ?? new Uint8Array()
    return message
  },
}

messageTypeRegistry.set(AuthenticatedMessage.$type, AuthenticatedMessage)

function createBasePlayerPositionMessage(): PlayerPositionMessage {
  return { $type: 'RandoProto.PlayerPositionMessage', x: 0, y: 0 }
}

export const PlayerPositionMessage = {
  $type: 'RandoProto.PlayerPositionMessage' as const,

  encode(message: PlayerPositionMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x)
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerPositionMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBasePlayerPositionMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float()
          break
        case 2:
          message.y = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PlayerPositionMessage {
    return {
      $type: PlayerPositionMessage.$type,
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    }
  },

  toJSON(message: PlayerPositionMessage): unknown {
    const obj: any = {}
    message.x !== undefined && (obj.x = message.x)
    message.y !== undefined && (obj.y = message.y)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<PlayerPositionMessage>, I>>(object: I): PlayerPositionMessage {
    const message = createBasePlayerPositionMessage()
    message.x = object.x ?? 0
    message.y = object.y ?? 0
    return message
  },
}

messageTypeRegistry.set(PlayerPositionMessage.$type, PlayerPositionMessage)

function createBaseUpdatePlayerPositionMessage(): UpdatePlayerPositionMessage {
  return { $type: 'RandoProto.UpdatePlayerPositionMessage', playerId: '', x: 0, y: 0 }
}

export const UpdatePlayerPositionMessage = {
  $type: 'RandoProto.UpdatePlayerPositionMessage' as const,

  encode(message: UpdatePlayerPositionMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playerId !== '') {
      writer.uint32(10).string(message.playerId)
    }
    if (message.x !== 0) {
      writer.uint32(21).float(message.x)
    }
    if (message.y !== 0) {
      writer.uint32(29).float(message.y)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePlayerPositionMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUpdatePlayerPositionMessage()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.playerId = reader.string()
          break
        case 2:
          message.x = reader.float()
          break
        case 3:
          message.y = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UpdatePlayerPositionMessage {
    return {
      $type: UpdatePlayerPositionMessage.$type,
      playerId: isSet(object.playerId) ? String(object.playerId) : '',
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    }
  },

  toJSON(message: UpdatePlayerPositionMessage): unknown {
    const obj: any = {}
    message.playerId !== undefined && (obj.playerId = message.playerId)
    message.x !== undefined && (obj.x = message.x)
    message.y !== undefined && (obj.y = message.y)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePlayerPositionMessage>, I>>(object: I): UpdatePlayerPositionMessage {
    const message = createBaseUpdatePlayerPositionMessage()
    message.playerId = object.playerId ?? ''
    message.x = object.x ?? 0
    message.y = object.y ?? 0
    return message
  },
}

messageTypeRegistry.set(UpdatePlayerPositionMessage.$type, UpdatePlayerPositionMessage)

function createBaseUdpPacket(): UdpPacket {
  return { $type: 'RandoProto.UdpPacket', udpId: 0, encryptedPacket: new Uint8Array() }
}

export const UdpPacket = {
  $type: 'RandoProto.UdpPacket' as const,

  encode(message: UdpPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.udpId !== 0) {
      writer.uint32(8).int32(message.udpId)
    }
    if (message.encryptedPacket.length !== 0) {
      writer.uint32(18).bytes(message.encryptedPacket)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UdpPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseUdpPacket()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.udpId = reader.int32()
          break
        case 2:
          message.encryptedPacket = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UdpPacket {
    return {
      $type: UdpPacket.$type,
      udpId: isSet(object.udpId) ? Number(object.udpId) : 0,
      encryptedPacket: isSet(object.encryptedPacket) ? bytesFromBase64(object.encryptedPacket) : new Uint8Array(),
    }
  },

  toJSON(message: UdpPacket): unknown {
    const obj: any = {}
    message.udpId !== undefined && (obj.udpId = Math.round(message.udpId))
    message.encryptedPacket !== undefined &&
      (obj.encryptedPacket = base64FromBytes(message.encryptedPacket !== undefined ? message.encryptedPacket : new Uint8Array()))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<UdpPacket>, I>>(object: I): UdpPacket {
    const message = createBaseUdpPacket()
    message.udpId = object.udpId ?? 0
    message.encryptedPacket = object.encryptedPacket ?? new Uint8Array()
    return message
  },
}

messageTypeRegistry.set(UdpPacket.$type, UdpPacket)

function createBaseTrackerUpdate(): TrackerUpdate {
  return { $type: 'RandoProto.TrackerUpdate', id: '', value: 0 }
}

export const TrackerUpdate = {
  $type: 'RandoProto.TrackerUpdate' as const,

  encode(message: TrackerUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrackerUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseTrackerUpdate()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.value = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): TrackerUpdate {
    return {
      $type: TrackerUpdate.$type,
      id: isSet(object.id) ? String(object.id) : '',
      value: isSet(object.value) ? Number(object.value) : 0,
    }
  },

  toJSON(message: TrackerUpdate): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.value !== undefined && (obj.value = Math.round(message.value))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<TrackerUpdate>, I>>(object: I): TrackerUpdate {
    const message = createBaseTrackerUpdate()
    message.id = object.id ?? ''
    message.value = object.value ?? 0
    return message
  },
}

messageTypeRegistry.set(TrackerUpdate.$type, TrackerUpdate)

function createBaseResetTracker(): ResetTracker {
  return { $type: 'RandoProto.ResetTracker' }
}

export const ResetTracker = {
  $type: 'RandoProto.ResetTracker' as const,

  encode(_: ResetTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetTracker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseResetTracker()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): ResetTracker {
    return {
      $type: ResetTracker.$type,
    }
  },

  toJSON(_: ResetTracker): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<ResetTracker>, I>>(_: I): ResetTracker {
    const message = createBaseResetTracker()
    return message
  },
}

messageTypeRegistry.set(ResetTracker.$type, ResetTracker)

function createBaseTrackerFlagsUpdate(): TrackerFlagsUpdate {
  return { $type: 'RandoProto.TrackerFlagsUpdate', flags: [] }
}

export const TrackerFlagsUpdate = {
  $type: 'RandoProto.TrackerFlagsUpdate' as const,

  encode(message: TrackerFlagsUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.flags) {
      writer.uint32(10).string(v!)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrackerFlagsUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseTrackerFlagsUpdate()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.flags.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): TrackerFlagsUpdate {
    return {
      $type: TrackerFlagsUpdate.$type,
      flags: Array.isArray(object?.flags) ? object.flags.map((e: any) => String(e)) : [],
    }
  },

  toJSON(message: TrackerFlagsUpdate): unknown {
    const obj: any = {}
    if (message.flags) {
      obj.flags = message.flags.map((e) => e)
    } else {
      obj.flags = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<TrackerFlagsUpdate>, I>>(object: I): TrackerFlagsUpdate {
    const message = createBaseTrackerFlagsUpdate()
    message.flags = object.flags?.map((e) => e) || []
    return message
  },
}

messageTypeRegistry.set(TrackerFlagsUpdate.$type, TrackerFlagsUpdate)

function createBaseRequestFullUpdate(): RequestFullUpdate {
  return { $type: 'RandoProto.RequestFullUpdate' }
}

export const RequestFullUpdate = {
  $type: 'RandoProto.RequestFullUpdate' as const,

  encode(_: RequestFullUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFullUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRequestFullUpdate()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): RequestFullUpdate {
    return {
      $type: RequestFullUpdate.$type,
    }
  },

  toJSON(_: RequestFullUpdate): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RequestFullUpdate>, I>>(_: I): RequestFullUpdate {
    const message = createBaseRequestFullUpdate()
    return message
  },
}

messageTypeRegistry.set(RequestFullUpdate.$type, RequestFullUpdate)

function createBaseSetTrackerEndpointId(): SetTrackerEndpointId {
  return { $type: 'RandoProto.SetTrackerEndpointId', endpointId: '' }
}

export const SetTrackerEndpointId = {
  $type: 'RandoProto.SetTrackerEndpointId' as const,

  encode(message: SetTrackerEndpointId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.endpointId !== '') {
      writer.uint32(10).string(message.endpointId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetTrackerEndpointId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseSetTrackerEndpointId()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.endpointId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SetTrackerEndpointId {
    return {
      $type: SetTrackerEndpointId.$type,
      endpointId: isSet(object.endpointId) ? String(object.endpointId) : '',
    }
  },

  toJSON(message: SetTrackerEndpointId): unknown {
    const obj: any = {}
    message.endpointId !== undefined && (obj.endpointId = message.endpointId)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<SetTrackerEndpointId>, I>>(object: I): SetTrackerEndpointId {
    const message = createBaseSetTrackerEndpointId()
    message.endpointId = object.endpointId ?? ''
    return message
  },
}

messageTypeRegistry.set(SetTrackerEndpointId.$type, SetTrackerEndpointId)

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte))
  }
  return btoa(bin.join(''))
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P> | '$type'>, never>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
