import { AdditiveTweening } from 'additween'

function noop() {}

export class AdditiveTweeningMock {
  time!: number
  animationStepScheduled!: boolean
  animationStep!: () => void

  stubMethodNames = ['scheduleAnimationFrame', 'now']
  originalMethods: Record<string, any>

  constructor() {
    this.originalMethods = {
      scheduleAnimationFrame: undefined,
      now: undefined
    }
    this.reset()
  }

  tick(duration: number): void {
    this.time += duration
    if (this.animationStepScheduled) {
      this.animationStepScheduled = false
      this.animationStep()
    }
  }

  reset(): void {
    this.time = 0
    this.animationStep = noop
    this.animationStepScheduled = false
  }

  install(additiveTweening: typeof AdditiveTweening): void {
    this.stubMethodNames.forEach((method) => {
      this.originalMethods[method] = (additiveTweening.prototype as any)[method]
      ;(additiveTweening.prototype as any)[method] = (this as any)[method].bind(this)
    })
    this.reset()
  }

  uninstall(additiveTweening: typeof AdditiveTweening): void {
    this.stubMethodNames.forEach((method) => {
      ;(additiveTweening.prototype as any)[method] = this.originalMethods[method]
    })
    this.reset()
  }

  scheduleAnimationFrame(cb: () => void): void {
    this.animationStep = cb
    this.animationStepScheduled = true
  }

  now(): number {
    return this.time
  }
}
