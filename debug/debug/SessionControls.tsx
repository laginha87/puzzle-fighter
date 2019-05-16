import * as React from 'react';

type State = {

};

export class SessionControls extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>

            <div className='mb-4 mt-2'>
                <button className='btn btn-primary'>Save Session</button>
                <button className='btn btn-secondary ml-2'>Open Session</button>
            </div>
            <div className='card'>
                <div className='card-body'>
                    Session
                </div>

            </div>
        </div>;
    }
}
