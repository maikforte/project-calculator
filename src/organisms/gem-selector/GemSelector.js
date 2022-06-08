import './GemSelector.css';

import React from "react";

import { DropdownButton, Dropdown } from 'react-bootstrap';

import CONSTANTS from '../../config/constants.json';

import { Button } from '../../atoms/Atoms';
import { GemTypeSelector } from '../../molecules/Molecules';
import { star } from '../../utils/ImageUtil';

import { Modal } from 'react-bootstrap';

export const GemSelector = (props) => {

    const getStars = (stars) => {
        const starsElement = [];

        for (let i = 0; i < stars; i++) {
            starsElement.push(<img className="star" src={star} key={i} />);
        }

        return starsElement;
    }

    return (
        <Modal centered={true} show={props.show} onHide={() => props.handleClose()}>
            <Modal.Body className="modal-container">
                <div className="options-container">
                    <div className="gem-type-wrapper">
                        <GemTypeSelector changeGemType={props.changeGemType} gem={props.gem}/>
                    </div>
                    <div className="gem-stats-wrapper">
                        <h4 className="heading">Stats</h4>
                        <div className="gem-stats-option-wrapper">
                            <Button disabled={props.gem?.stars > CONSTANTS.MIN_STARS ? false : true} onClick={() => props.changeStars(-1)}>{"<"}</Button>
                            <span className="label">{getStars(props.gem?.stars)}</span>
                            <Button disabled={props.gem?.stars < CONSTANTS.MAX_STARS ? false : true} onClick={() => props.changeStars(+1)}>{">"}</Button>
                        </div>
                        <div className="gem-stats-option-wrapper">
                            <Button disabled={props.gem?.upgrade > CONSTANTS.MIN_UPGRADE ? false : true} onClick={() => props.changeUpgrade(-1)}>{"<"}</Button>
                            <span className="label">+{props.gem?.upgrade}</span>
                            <Button disabled={props.gem?.upgrade < CONSTANTS.MAX_UPGRADE ? false : true} onClick={() => props.changeUpgrade(+1)}>{">"}</Button>
                        </div>
                        <div className="gem-stats-option-wrapper">
                            <DropdownButton className="gem-stats-attribute-dropdown" id="gem-attr-selector" title={props.gem?.attribute ? props.gem?.attribute : "Attribute"}>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.HP_FLAT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.HP_FLAT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.HP_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.HP_PERCENT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.ATTK_FLAT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.ATTK_FLAT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.ATTK_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.ATTK_PERCENT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.DEF_FLAT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.DEF_FLAT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.DEF_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.DEF_PERCENT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.REC_FLAT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.REC_FLAT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.REC_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.REC_PERCENT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.RES_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.RES_PERCENT}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.CD_PERCENT)}>
                                    {CONSTANTS.GEM_ATTRIBUTES.CD_PERCENT}
                                </Dropdown.Item>
                                {
                                    props.gem?.shape === CONSTANTS.GEM_SHAPE.SQUARE
                                        ?   <Dropdown.Item onClick={() => props.changeAttribute(CONSTANTS.GEM_ATTRIBUTES.CR_PERCENT)}>
                                                {CONSTANTS.GEM_ATTRIBUTES.CR_PERCENT}
                                            </Dropdown.Item>
                                        : null
                                }
                            </DropdownButton>
                        </div>
                        <h4 className="heading">Subs</h4>
                        <h5>Soon!</h5>
                    </div>
                </div>
                <div>
                    <Button id="btn-save" onClick={() => props.handleClose()}>
                        Save
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
};