import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
// import PropTypes from 'prop-types';

// const XXPanel = ({ options, data, width, height }) => {
interface Props extends PanelProps<SimpleOptions> {}

export const XXPanel: React.FC<Props> = ({ options, data, width, height }) => {

    return (
        <div>
            some text for scratch
        </div>
    );
};

// XXPanel.propTypes = {
//     options: PropTypes.object,
//     data: PropTypes.object,
//     width: PropTypes.number,
//     height: PropTypes.number,
// };

// export default XXPanel;
