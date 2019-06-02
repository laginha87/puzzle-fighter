import * as React from 'react';

interface Props {
    onChange: (e: number) => void;
    min?: number;
    max?: number;
}

interface State {

}


export class NumberInputComponent extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }
    render() {
        const { min, max } = this.props;
        const inputAttrs = { min, max, onChange: this.onChange };

        return <div>
            <input type='number' {...inputAttrs} />
        </div>;
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(parseInt(e.currentTarget.value, 10));
    }
}