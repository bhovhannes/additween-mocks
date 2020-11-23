import { describe, it, expect, jest } from "@jest/globals";
import { AdditiveTweeningMock } from ".";
import { AdditiveTweening } from "additween";

describe("additween-mocks", function () {
    it("exports AdditiveTweeningMock class", function () {
        expect(AdditiveTweeningMock).toBeInstanceOf(Function);
    });

    it("patches requestAnimationFrame in AdditiveTweening, so the original one is not called", function () {
        const rafSpy = jest.spyOn(window, "requestAnimationFrame");
        const renderSpy = jest.fn();
        const finishSpy = jest.fn();

        const animation = new AdditiveTweening({
            onRender: renderSpy,
            onFinish: finishSpy,
        });

        // setup mock
        const additiveTweeningMock = new AdditiveTweeningMock();
        additiveTweeningMock.install(AdditiveTweening);

        // trigger animation
        animation.tween({ x: 0, y: 0 }, { x: 100, y: 0 }, 100);

        // tick to 1/10-th of animation
        additiveTweeningMock.tick(10);
        expect(rafSpy).not.toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalledWith({ x: 10, y: 0 });
        expect(finishSpy).not.toHaveBeenCalled();
        renderSpy.mockReset();

        // tick another 2/10
        additiveTweeningMock.tick(20);
        expect(renderSpy).toHaveBeenCalledWith({ x: 30, y: 0 });
        expect(finishSpy).not.toHaveBeenCalled();
        renderSpy.mockReset();

        // tick to the end
        additiveTweeningMock.tick(100);
        expect(renderSpy).toHaveBeenCalledWith({ x: 100, y: 0 });
        expect(finishSpy).toHaveBeenCalled();

        additiveTweeningMock.uninstall(AdditiveTweening);
        expect(rafSpy).not.toHaveBeenCalled();
    });
});
