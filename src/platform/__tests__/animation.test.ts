describe('platform/animation utilities', () => {
  const load = (os: string) => {
    let mod: any
    jest.isolateModules(() => {
      jest.doMock('react-native', () => ({ Platform: { OS: os } }))
      mod = require('../animation')
    })
    return mod
  }

  afterEach(() => jest.restoreAllMocks())

  it('nativeDriverEnabled=true on native', () => {
    expect(load('ios').nativeDriverEnabled).toBe(true)
  })

  it('nativeDriverEnabled=false on web', () => {
    expect(load('web').nativeDriverEnabled).toBe(false)
  })

  it('defaultAnimationConfig correct driver on ios', () => {
    expect(load('ios').defaultAnimationConfig).toEqual({ useNativeDriver: true, isInteraction: false })
  })

  it('defaultAnimationConfig false driver on web', () => {
    expect(load('web').defaultAnimationConfig).toEqual({ useNativeDriver: false, isInteraction: false })
  })

  it('hardwareAccelerationProps on android', () => {
    expect(load('android').hardwareAccelerationProps).toEqual({ renderToHardwareTextureAndroid: true, shouldRasterizeIOS: false })
  })

  it('hardwareAccelerationProps on ios', () => {
    expect(load('ios').hardwareAccelerationProps).toEqual({ renderToHardwareTextureAndroid: false, shouldRasterizeIOS: true })
  })

  it('hardwareAccelerationProps on web', () => {
    expect(load('web').hardwareAccelerationProps).toEqual({ renderToHardwareTextureAndroid: false, shouldRasterizeIOS: false })
  })
})
