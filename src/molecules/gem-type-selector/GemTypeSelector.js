import './GemTypeSelector.css';

import CONSTANTS from '../../config/constants.json';

import {
    fortitudeDiamond0,
    fortitudeSquare0,
    fortitudeTriangle0,
    tenacityDiamond0,
    tenacitySquare0,
    tenacityTriangle0,
    ferocityDiamond0,
    ferocitySquare0,
    ferocityTriangle0,
    healingDiamond0,
    healingSquare0,
    healingTriangle0,
    convictionDiamond0,
    convictionSquare0,
    convictionTriangle0,
    protectionDiamond0,
    protectionSquare0,
    protectionTriangle0,
    lifeDiamond0,
    lifeSquare0,
    lifeTriangle0,
    valorDiamond0,
    valorSquare0,
    valorTriangle0,
    vitalityDiamond0,
    vitalitySquare0,
    vitalityTriangle0,
    ruinDiamond0,
    ruinSquare0,
    ruinTriangle0,
    intuitionDiamond0,
    intuitionSquare0,
    intuitionTriangle0,
} from '../../utils/ImageUtil';

export const GemTypeSelector = (props) => {
    const gems = [
        {
            type: CONSTANTS.GEM_TYPE.FORTITUDE,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: fortitudeTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.FORTITUDE,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: fortitudeSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.FORTITUDE,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: fortitudeDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.TENACITY,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: tenacityTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.TENACITY,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: tenacitySquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.TENACITY,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: tenacityDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.FEROCITY,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: ferocityTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.FEROCITY,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: ferocitySquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.FEROCITY,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: ferocityDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.HEALING,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: healingTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.HEALING,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: healingSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.HEALING,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: healingDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.CONVICTION,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: convictionTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.CONVICTION,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: convictionSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.CONVICTION,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: convictionDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.PROTECTION,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: protectionTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.PROTECTION,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: protectionSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.PROTECTION,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: protectionDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.LIFE,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: lifeTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.LIFE,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: lifeSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.LIFE,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: lifeDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.VALOR,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: valorTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.VALOR,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: valorSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.VALOR,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: valorDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.VITALITY,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: vitalityTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.VITALITY,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: vitalitySquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.VITALITY,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: vitalityDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.RUIN,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: ruinTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.RUIN,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: ruinSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.RUIN,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: ruinDiamond0
        },
        {
            type: CONSTANTS.GEM_TYPE.INTUITION,
            shape: CONSTANTS.GEM_SHAPE.TRIANGLE,
            image: intuitionTriangle0
        },
        {
            type: CONSTANTS.GEM_TYPE.INTUITION,
            shape: CONSTANTS.GEM_SHAPE.SQUARE,
            image: intuitionSquare0
        },
        {
            type: CONSTANTS.GEM_TYPE.INTUITION,
            shape: CONSTANTS.GEM_SHAPE.DIAMOND,
            image: intuitionDiamond0
        }
    ]

    return (
        <div className="gem-type-selector-container">
            <h5 className="heading">Gem Type</h5>
            <div className="gem-type-selector-selection-container">
                {
                    gems.map((gem, index) => {
                        const classNames = `gem-type-selector-gem ${gem.type === props.gem?.type && gem.shape === props.gem?.shape ? 'gem-type-selector-gem-selected' : ''}`

                        return (
                            <div key={index} className={classNames} onClick={() => props.changeGemType(gem.type, gem.shape)}>
                                <img
                                    src={gem.image} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
	)
};