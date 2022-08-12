import { RequestService } from './RequestService';

const getAstromon = async (name) => {
    const response = await RequestService.get(`/astromon/${name}`);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 500) {
        // do something
    } else {
        // do other checks
    }
    
}

export const AstromonService = {
    getAstromon
}