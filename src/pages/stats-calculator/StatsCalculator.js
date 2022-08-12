import React from "react";

import CONSTANTS from '../../config/constants.json';

import { Gems } from '../../molecules/Molecules';
import { GemSelector } from '../../organisms/Organisms';
import { AstromonService } from "../../services/AstromonService";


class StatsCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            astromon: {},
            gems: [
                {
                    type: CONSTANTS.GEM_TYPE.FORTITUDE,
                    shape: CONSTANTS.GEM_SHAPE.SQUARE,
                    attribute: CONSTANTS.GEM_ATTRIBUTES.ATTK_FLAT,
                    stars: 6,
                    upgrade: 0
                },
                {
                    type: CONSTANTS.GEM_TYPE.FORTITUDE,
                    shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
                    attribute: CONSTANTS.GEM_ATTRIBUTES.ATTK_FLAT,
                    stars: 6,
                    upgrade: 15
                },
                {
                    type: CONSTANTS.GEM_TYPE.FORTITUDE,
                    shape: CONSTANTS.GEM_SHAPE.DIAMOND,
                    attribute: CONSTANTS.GEM_ATTRIBUTES.ATTK_FLAT,
                    stars: 4,
                    upgrade: 15
                }
            ],
            show: false,
            selectedGemIndex: null
        };

        this.setAstromon();
    }

    setAstromon = async () => {
        const astromon = await AstromonService.getAstromon('Persephone');

        this.setState({
            astromon: astromon
        }, () => {
            console.log(this.state);
        });
    }

    setShow = () => {
        const show = !this.state.show;

        this.setState({
            show: show
        });
    }

    handleClose = () => {
        this.setState({
            selectedGemIndex: null
        }, () => {
            this.setShow();
        });
    }

    handleShow = () => {
        this.setShow();
    }

    changeGemIndex = (index) => {
        this.setState({
            selectedGemIndex: index
        }, () => {
            this.setShow();
        });
    }

    changeStars = (move) => {
        const gems = this.state.gems;
        gems[this.state.selectedGemIndex].stars += move;
        this.setState({
            gems: gems
        });
    }

    changeGemType = (type, shape) => {
        const gems = this.state.gems;

        gems[this.state.selectedGemIndex].type = type;
        gems[this.state.selectedGemIndex].shape = shape;

        this.setState({
            gems: gems
        });
    }

    changeUpgrade = (move) => {
        const gems = this.state.gems;
        gems[this.state.selectedGemIndex].upgrade += move;
        this.setState({
            gems: gems
        });
    }

    changeAttribute = (attribute) => {
        const gems = this.state.gems;
        gems[this.state.selectedGemIndex].attribute = attribute;
        this.setState({
            gems: gems
        });
    }

    render() {
        return (
            <div>
                <div>
                    asdasdkj
                </div>
                <div>
                    <Gems gems={this.state.gems} changeGemIndex={this.changeGemIndex}/>
                    <GemSelector
                        gem={this.state.gems[this.state.selectedGemIndex]}
                        show={this.state.show}
                        handleSave={this.handleSave}
                        handleClose={this.handleClose}
                        changeStars={this.changeStars}
                        changeGemType={this.changeGemType}
                        changeUpgrade={this.changeUpgrade}
                        changeAttribute={this.changeAttribute} />
                </div>
            </div>
        );
    }
}

export default StatsCalculator;