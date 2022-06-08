import './Gem.css';

import star from '../../images/star.webp';

import gemSlot from '../../images/gem-slot.webp';

import {
    tenacityDiamond0,
    tenacityDiamond3,
    tenacityDiamond6,
    tenacityDiamond9,
    tenacityDiamond12,
    tenacityDiamond15,
    tenacitySquare0,
    tenacitySquare3,
    tenacitySquare6,
    tenacitySquare9,
    tenacitySquare12,
    tenacitySquare15,
    tenacityTriangle0,
    tenacityTriangle3,
    tenacityTriangle6,
    tenacityTriangle9,
    tenacityTriangle12,
    tenacityTriangle15,
    fortitudeDiamond0,
    fortitudeDiamond3,
    fortitudeDiamond6,
    fortitudeDiamond9,
    fortitudeDiamond12,
    fortitudeDiamond15,
    fortitudeSquare0,
    fortitudeSquare3,
    fortitudeSquare6,
    fortitudeSquare9,
    fortitudeSquare12,
    fortitudeSquare15,
    fortitudeTriangle0,
    fortitudeTriangle3,
    fortitudeTriangle6,
    fortitudeTriangle9,
    fortitudeTriangle12,
    fortitudeTriangle15,
    ferocityDiamond0,
    ferocityDiamond3,
    ferocityDiamond6,
    ferocityDiamond9,
    ferocityDiamond12,
    ferocityDiamond15,
    ferocitySquare0,
    ferocitySquare3,
    ferocitySquare6,
    ferocitySquare9,
    ferocitySquare12,
    ferocitySquare15,
    ferocityTriangle0,
    ferocityTriangle3,
    ferocityTriangle6,
    ferocityTriangle9,
    ferocityTriangle12,
    ferocityTriangle15,
    healingDiamond0,
    healingDiamond3,
    healingDiamond6,
    healingDiamond9,
    healingDiamond12,
    healingDiamond15,
    healingSquare0,
    healingSquare3,
    healingSquare6,
    healingSquare9,
    healingSquare12,
    healingSquare15,
    healingTriangle0,
    healingTriangle3,
    healingTriangle6,
    healingTriangle9,
    healingTriangle12,
    healingTriangle15,
    convictionDiamond0,
    convictionDiamond3,
    convictionDiamond6,
    convictionDiamond9,
    convictionDiamond12,
    convictionDiamond15,
    convictionSquare0,
    convictionSquare3,
    convictionSquare6,
    convictionSquare9,
    convictionSquare12,
    convictionSquare15,
    convictionTriangle0,
    convictionTriangle3,
    convictionTriangle6,
    convictionTriangle9,
    convictionTriangle12,
    convictionTriangle15,
    protectionDiamond0,
    protectionDiamond3,
    protectionDiamond6,
    protectionDiamond9,
    protectionDiamond12,
    protectionDiamond15,
    protectionSquare0,
    protectionSquare3,
    protectionSquare6,
    protectionSquare9,
    protectionSquare12,
    protectionSquare15,
    protectionTriangle0,
    protectionTriangle3,
    protectionTriangle6,
    protectionTriangle9,
    protectionTriangle12,
    protectionTriangle15,
    lifeDiamond0,
    lifeDiamond3,
    lifeDiamond6,
    lifeDiamond9,
    lifeDiamond12,
    lifeDiamond15,
    lifeSquare0,
    lifeSquare3,
    lifeSquare6,
    lifeSquare9,
    lifeSquare12,
    lifeSquare15,
    lifeTriangle0,
    lifeTriangle3,
    lifeTriangle6,
    lifeTriangle9,
    lifeTriangle12,
    lifeTriangle15,
    valorDiamond0,
    valorDiamond3,
    valorDiamond6,
    valorDiamond9,
    valorDiamond12,
    valorDiamond15,
    valorSquare0,
    valorSquare3,
    valorSquare6,
    valorSquare9,
    valorSquare12,
    valorSquare15,
    valorTriangle0,
    valorTriangle3,
    valorTriangle6,
    valorTriangle9,
    valorTriangle12,
    valorTriangle15,
    vitalityDiamond0,
    vitalityDiamond3,
    vitalityDiamond6,
    vitalityDiamond9,
    vitalityDiamond12,
    vitalityDiamond15,
    vitalitySquare0,
    vitalitySquare3,
    vitalitySquare6,
    vitalitySquare9,
    vitalitySquare12,
    vitalitySquare15,
    vitalityTriangle0,
    vitalityTriangle3,
    vitalityTriangle6,
    vitalityTriangle9,
    vitalityTriangle12,
    vitalityTriangle15,
    ruinDiamond0,
    ruinDiamond3,
    ruinDiamond6,
    ruinDiamond9,
    ruinDiamond12,
    ruinDiamond15,
    ruinSquare0,
    ruinSquare3,
    ruinSquare6,
    ruinSquare9,
    ruinSquare12,
    ruinSquare15,
    ruinTriangle0,
    ruinTriangle3,
    ruinTriangle6,
    ruinTriangle9,
    ruinTriangle12,
    ruinTriangle15,
    intuitionDiamond0,
    intuitionDiamond3,
    intuitionDiamond6,
    intuitionDiamond9,
    intuitionDiamond12,
    intuitionDiamond15,
    intuitionSquare0,
    intuitionSquare3,
    intuitionSquare6,
    intuitionSquare9,
    intuitionSquare12,
    intuitionSquare15,
    intuitionTriangle0,
    intuitionTriangle3,
    intuitionTriangle6,
    intuitionTriangle9,
    intuitionTriangle12,
    intuitionTriangle15,
} from '../../utils/ImageUtil';

export const Gem = (props) => {
    const gemTypes = {
        tenacity: {
            diamond: {
                "0": tenacityDiamond0,
                "3": tenacityDiamond3,
                "6": tenacityDiamond6,
                "9": tenacityDiamond9,
                "12": tenacityDiamond12,
                "15": tenacityDiamond15,
            },
            square: {
                "0": tenacitySquare0,
                "3": tenacitySquare3,
                "6": tenacitySquare6,
                "9": tenacitySquare9,
                "12": tenacitySquare12,
                "15": tenacitySquare15,
            },
            triangle: {
                "0": tenacityTriangle0,
                "3": tenacityTriangle3,
                "6": tenacityTriangle6,
                "9": tenacityTriangle9,
                "12": tenacityTriangle12,
                "15": tenacityTriangle15,
            }
        },
        fortitude: {
            diamond: {
                "0": fortitudeDiamond0,
                "3": fortitudeDiamond3,
                "6": fortitudeDiamond6,
                "9": fortitudeDiamond9,
                "12": fortitudeDiamond12,
                "15": fortitudeDiamond15,
            },
            square: {
                "0": fortitudeSquare0,
                "3": fortitudeSquare3,
                "6": fortitudeSquare6,
                "9": fortitudeSquare9,
                "12": fortitudeSquare12,
                "15": fortitudeSquare15,
            },
            triangle: {
                "0": fortitudeTriangle0,
                "3": fortitudeTriangle3,
                "6": fortitudeTriangle6,
                "9": fortitudeTriangle9,
                "12": fortitudeTriangle12,
                "15": fortitudeTriangle15,
            }
        },
        ferocity: {
            diamond: {
                "0": ferocityDiamond0,
                "3": ferocityDiamond3,
                "6": ferocityDiamond6,
                "9": ferocityDiamond9,
                "12": ferocityDiamond12,
                "15": ferocityDiamond15,
            },
            square: {
                "0": ferocitySquare0,
                "3": ferocitySquare3,
                "6": ferocitySquare6,
                "9": ferocitySquare9,
                "12": ferocitySquare12,
                "15": ferocitySquare15,
            },
            triangle: {
                "0": ferocityTriangle0,
                "3": ferocityTriangle3,
                "6": ferocityTriangle6,
                "9": ferocityTriangle9,
                "12": ferocityTriangle12,
                "15": ferocityTriangle15,
            }
        },
        healing: {
            diamond: {
                "0": healingDiamond0,
                "3": healingDiamond3,
                "6": healingDiamond6,
                "9": healingDiamond9,
                "12": healingDiamond12,
                "15": healingDiamond15,
            },
            square: {
                "0": healingSquare0,
                "3": healingSquare3,
                "6": healingSquare6,
                "9": healingSquare9,
                "12": healingSquare12,
                "15": healingSquare15,
            },
            triangle: {
                "0": healingTriangle0,
                "3": healingTriangle3,
                "6": healingTriangle6,
                "9": healingTriangle9,
                "12": healingTriangle12,
                "15": healingTriangle15,
            }
        },
        conviction: {
            diamond: {
                "0": convictionDiamond0,
                "3": convictionDiamond3,
                "6": convictionDiamond6,
                "9": convictionDiamond9,
                "12": convictionDiamond12,
                "15": convictionDiamond15,
            },
            square: {
                "0": convictionSquare0,
                "3": convictionSquare3,
                "6": convictionSquare6,
                "9": convictionSquare9,
                "12": convictionSquare12,
                "15": convictionSquare15,
            },
            triangle: {
                "0": convictionTriangle0,
                "3": convictionTriangle3,
                "6": convictionTriangle6,
                "9": convictionTriangle9,
                "12": convictionTriangle12,
                "15": convictionTriangle15,
            }
        },
        protection: {
            diamond: {
                "0": protectionDiamond0,
                "3": protectionDiamond3,
                "6": protectionDiamond6,
                "9": protectionDiamond9,
                "12": protectionDiamond12,
                "15": protectionDiamond15,
            },
            square: {
                "0": protectionSquare0,
                "3": protectionSquare3,
                "6": protectionSquare6,
                "9": protectionSquare9,
                "12": protectionSquare12,
                "15": protectionSquare15,
            },
            triangle: {
                "0": protectionTriangle0,
                "3": protectionTriangle3,
                "6": protectionTriangle6,
                "9": protectionTriangle9,
                "12": protectionTriangle12,
                "15": protectionTriangle15,
            }
        },
        life: {
            diamond: {
                "0": lifeDiamond0,
                "3": lifeDiamond3,
                "6": lifeDiamond6,
                "9": lifeDiamond9,
                "12": lifeDiamond12,
                "15": lifeDiamond15,
            },
            square: {
                "0": lifeSquare0,
                "3": lifeSquare3,
                "6": lifeSquare6,
                "9": lifeSquare9,
                "12": lifeSquare12,
                "15": lifeSquare15,
            },
            triangle: {
                "0": lifeTriangle0,
                "3": lifeTriangle3,
                "6": lifeTriangle6,
                "9": lifeTriangle9,
                "12": lifeTriangle12,
                "15": lifeTriangle15,
            }
        },
        valor: {
            diamond: {
                "0": valorDiamond0,
                "3": valorDiamond3,
                "6": valorDiamond6,
                "9": valorDiamond9,
                "12": valorDiamond12,
                "15": valorDiamond15,
            },
            square: {
                "0": valorSquare0,
                "3": valorSquare3,
                "6": valorSquare6,
                "9": valorSquare9,
                "12": valorSquare12,
                "15": valorSquare15,
            },
            triangle: {
                "0": valorTriangle0,
                "3": valorTriangle3,
                "6": valorTriangle6,
                "9": valorTriangle9,
                "12": valorTriangle12,
                "15": valorTriangle15,
            }
        },
        vitality: {
            diamond: {
                "0": vitalityDiamond0,
                "3": vitalityDiamond3,
                "6": vitalityDiamond6,
                "9": vitalityDiamond9,
                "12": vitalityDiamond12,
                "15": vitalityDiamond15,
            },
            square: {
                "0": vitalitySquare0,
                "3": vitalitySquare3,
                "6": vitalitySquare6,
                "9": vitalitySquare9,
                "12": vitalitySquare12,
                "15": vitalitySquare15,
            },
            triangle: {
                "0": vitalityTriangle0,
                "3": vitalityTriangle3,
                "6": vitalityTriangle6,
                "9": vitalityTriangle9,
                "12": vitalityTriangle12,
                "15": vitalityTriangle15,
            }
        },
        ruin: {
            diamond: {
                "0": ruinDiamond0,
                "3": ruinDiamond3,
                "6": ruinDiamond6,
                "9": ruinDiamond9,
                "12": ruinDiamond12,
                "15": ruinDiamond15,
            },
            square: {
                "0": ruinSquare0,
                "3": ruinSquare3,
                "6": ruinSquare6,
                "9": ruinSquare9,
                "12": ruinSquare12,
                "15": ruinSquare15,
            },
            triangle: {
                "0": ruinTriangle0,
                "3": ruinTriangle3,
                "6": ruinTriangle6,
                "9": ruinTriangle9,
                "12": ruinTriangle12,
                "15": ruinTriangle15,
            }
        },
        intuition: {
            diamond: {
                "0": intuitionDiamond0,
                "3": intuitionDiamond3,
                "6": intuitionDiamond6,
                "9": intuitionDiamond9,
                "12": intuitionDiamond12,
                "15": intuitionDiamond15,
            },
            square: {
                "0": intuitionSquare0,
                "3": intuitionSquare3,
                "6": intuitionSquare6,
                "9": intuitionSquare9,
                "12": intuitionSquare12,
                "15": intuitionSquare15,
            },
            triangle: {
                "0": intuitionTriangle0,
                "3": intuitionTriangle3,
                "6": intuitionTriangle6,
                "9": intuitionTriangle9,
                "12": intuitionTriangle12,
                "15": intuitionTriangle15,
            }
        }
    };

    const getUprade = (upgrade) => {
        if (!upgrade) return 0;

        if (upgrade < 3) {
            return 0;
        } else if (upgrade < 6) {
            return 3;
        } else if (upgrade < 9) {
            return 6;
        } else if (upgrade < 12) {
            return 9;
        } else if (upgrade < 15) {
            return 12;
        }

        return 15;
    }

    const getStars = (stars) => {
        const starsElement = [];

        for (let i = 0; i < stars; i++) {
            starsElement.push(<img className="star" src={star} key={i} />);
        }

        return starsElement;
    }

	return (
        <div onClick={() => props.changeGemIndex(props.index)} className="gem-wrapper">
            <div className="gem-container">
                <div className="star-container">
                    {
                        getStars(props.stars)
                    }
                </div>
                <div>
                    <div className="gem-upgrade-container">
                        <div className="gem-upgrade">
                            +{props.upgrade}
                        </div>
                    </div>
                    <img width="100"
                        src={
                            !props.stars
                                ? gemSlot
                                :   props.type && props.shape && props.upgrade !== null
                                        ? gemTypes[props.type][props.shape][getUprade(props.upgrade)]
                                        : gemTypes.tenacity.diamond['0']
                        }
                    />
                </div>
            </div>
        </div>
	)
}
