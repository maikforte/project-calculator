import './Gems.css';

import { Alert } from 'react-bootstrap';

import { Gem } from '../../atoms/Atoms';

export const Gems = (props) => {
    return (
        <div className="gems-wrapper">
            <Alert>
                <h4 className="heading">Gems</h4>
                <div>
                    {
                        props.gems.map((gem, index) =>
                            <Gem
                                key={index}
                                changeGemIndex={props.changeGemIndex}
                                index={index}
                                type={gem.type}
                                shape={gem.shape}
                                upgrade={gem.upgrade}
                                stars={gem.stars} />)
                    }
                </div>
            </Alert>
        </div>
	)
};