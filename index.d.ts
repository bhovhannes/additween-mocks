// Type definitions for additween-mocks [2.0.0]
// Project: additween-mocks
// Definitions by: Hovhannes Babayan <bhovhannes@gmail.com>

import {AdditiveTweening} from 'additween'

export class AdditiveTweeningMock {

    constructor()

    tick(duration?: number): void

    reset(): void

    install(additiveTweening: typeof AdditiveTweening): void

    uninstall(additiveTweening: typeof AdditiveTweening): void
}

