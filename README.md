# additween-mocks
[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![Dependencies][deps-image]][deps-url] [![Dev. Dependencies][dev-deps-image]][dev-deps-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Coverage][codecov-image]][codecov-url]

Mocks for the additween animation library. It can be used with any testing framework (in the usage example below we use jasmine).
 
It works by replacing some methods of `additween` with its stub implementations, which allow to synchronously move animation internal clock forward. 


## How to install

```bash
npm install additween-mocks --save
```


## Usage example

```javascript
import {AdditiveTweening} from 'additween'
import {AdditiveTweeningMock} from 'additween-mocks'
 
describe('my great app', function() {
    let additiveTweeningMock = new AdditiveTweeningMock()
    beforeEach(function () {
    	additiveTweeningMock = new AdditiveTweeningMock()
        additiveTweeningMock.install(AdditiveTweening)
    })

    afterEach(function () {
        additiveTweeningMock.uninstall(AdditiveTweening)
    })
    
    it('should animate perfectly', function() {
    	// let's say clicking a button 
    	// will cause an animation with 2000ms duration
    	// we assume there is a triggerClick method defined somewhere
    	let btn = document.getElementById('byButton')
    	triggerClick(btn)
    	
    	// let time go forward by 1000ms
    	additiveTweeningMock.tick(1000)
    	
    	//now we can make assertions about animation state after half of time
    	//expect(...)
    	
    	// let time go forward by another 1000ms
    	additiveTweeningMock.tick(1000)
    	
    	//now we can make assertions about animation final state
    	//expect(...)
    })
})
```

### Mock API

#### mock = new AdditiveTweeningMock()

Creates a new instance of mocking library.

#### mock.install(AdditiveTweening)

Pass an `AdditiveTweening` constructor in order to patch its animation-related methods.
 
#### mock.uninstall(AdditiveTweening)

Restores original implementation of passed in `AdditiveTweening`.
 
#### mock.tick(duration)

Moves animation clock forward by `duration` msecs. Animation `onRender` callback will be called once after that. If duration is greater or equal than total animation duration, `onFinish` callback also will be called.

#### mock.reset()

Reset animation clock to its initial state.



## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[deps-image]: https://img.shields.io/david/bhovhannes/additween-mocks.svg
[deps-url]: https://david-dm.org/bhovhannes/additween-mocks

[dev-deps-image]: https://img.shields.io/david/dev/bhovhannes/additween-mocks.svg
[dev-deps-url]: https://david-dm.org/bhovhannes/additween-mocks#info=devDependencies

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://www.npmjs.org/package/additween-mocks
[npm-version-image]: https://img.shields.io/npm/v/additween-mocks.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/additween-mocks.svg?style=flat

[travis-url]: https://travis-ci.org/bhovhannes/additween-mocks
[travis-image]: https://img.shields.io/travis/bhovhannes/additween-mocks.svg?style=flat

[codecov-url]: https://codecov.io/gh/bhovhannes/additween-mocks
[codecov-image]: https://img.shields.io/codecov/c/github/bhovhannes/additween-mocks.svg
