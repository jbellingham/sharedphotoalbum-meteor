/*~ On this line, import the module which this module adds to */

// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

declare module 'cloudinary-react' {
    class CloudinaryComponent {
        constructor(props, context)

        getChildContext(): any

        render(): any

        getChildTransformations(children): any

        getTransformations(): any

        normalizeOptions(...options): any

        getURL(extendedProps): any

        typesFrom(configParams): any
    }

    export class CloudinaryContext extends CloudinaryComponent {
        constructor(props, context)

        getChildContext(): any

        render(): any
    }

    export class Image extends CloudinaryComponent {
        constructor(props: any, context: any)

        render(): any

        get window(): any

        componentWillRecieveProps(): any

        prepareState(): any

        handleResize(e): any

        componentDidMount(): any

        componentWillUnmount(): any

        componentWillUpdate(): any

        findContainerWidth(): any

        applyBreakpoints(width, steps, options): any

        calc_breakpoint(width, steps): any

        device_pixel_ratio(roundDpr): any

        updateDpr(dataSrc): any

        maxWidth(requiredWidth): any

        cloudinary_update(url, options): any

    }

    export class Transformation extends CloudinaryComponent {
        constructor(props)

        render(): any
    }

    export class Video extends CloudinaryComponent {
        constructor(props)

        render(): any
    }
}