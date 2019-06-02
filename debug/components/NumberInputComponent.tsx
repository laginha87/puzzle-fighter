import * as React from 'react';

interface Props {
    onChange: (e: number) => void;
    min?: number;
    max?: number;
    label: string;
}

interface State {

}


export class NumberInputComponent extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }
    render() {
        const { min, max, label } = this.props;
        const inputAttrs = { min, max, onChange: this.onChange };

        return <div className='form-group'>
            <div>{label}</div>
            <input type='number' className='form-control' {...inputAttrs} />
        </div>;
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(parseInt(e.currentTarget.value, 10));
    }
}