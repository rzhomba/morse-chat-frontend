let audioContext: AudioContext
let oscillatorNode: OscillatorNode
let gainNode: GainNode
let gainValue: number
let initialized = false

export const initializeSound = async (freq: number, gain: number): Promise<void> => {
  audioContext = new window.AudioContext()

  oscillatorNode = audioContext.createOscillator()
  oscillatorNode.type = 'sine'
  oscillatorNode.frequency.value = 750

  gainNode = audioContext.createGain()
  gainNode.gain.value = 0
  gainValue = gain

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start()
  await audioContext.resume()

  initialized = true
}

const verifyInit = () => {
  if (!initialized) {
    throw new Error('Sound service was requested before initialization')
  }
}

export const clearSound = async (): Promise<void> => {
  verifyInit()
  oscillatorNode.stop()
  await audioContext.suspend()
}

export const resumeSound = () => {
  verifyInit()
  gainNode.gain.value = gainValue
}

export const stopSound = () => {
  verifyInit()
  gainNode.gain.value = 0
}
