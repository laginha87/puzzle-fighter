import * as React from 'react';

interface Props {
    children: React.ReactNode;
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

}
export const Col = (props: Props) => {
    return <div className={`col-${props.size}`}>
        {props.children}
    </div>;
};