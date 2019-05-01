interface EventEmitter<T extends string> extends Phaser.Events.EventEmitter {
    shutdown(): void;
    destroy(): void;
    eventNames(): any[];
    listeners(event: T): any[];
    listenerCount(event: T): number;
    emit(event: T, ...args: any[]): boolean;
    on(event: T, fn: Function, context?: any): Phaser.Events.EventEmitter;
    addListener(event: T, fn: Function, context?: any): Phaser.Events.EventEmitter;
    once(event: T, fn: Function, context?: any): Phaser.Events.EventEmitter;
    removeListener(event: T, fn?: Function, context?: any, once?: boolean): Phaser.Events.EventEmitter;
    off(event: T, fn?: Function, context?: any, once?: boolean): Phaser.Events.EventEmitter;
    removeAllListeners(event?: T): Phaser.Events.EventEmitter;

}