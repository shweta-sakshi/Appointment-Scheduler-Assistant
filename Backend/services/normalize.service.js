import nlp from "compromise"
import dates from "compromise-dates"

nlp.extend(dates)

const normalizetime = async (extractedResult) => {
    const extractEntities = extractedResult.entities;
    if (!extractEntities) {
        return {}
    }

    const timePhrase = extractEntities.time_phrase
    let datePhrase = extractEntities.date_phrase

    if (!datePhrase && !timePhrase) {
        return {}
    }

    const time = nlp(timePhrase).times().get()[0]['24h']
    const date_phrase = nlp(datePhrase).dates().json()[0].dates
    const date = date_phrase.start.split('T')[0]
    const timeZone = date_phrase.timezone


    if (!date || !time || !timeZone) {

    }

    const result = {
        normalized: {
            date: date,
            time: time,
            tz: timeZone
        },
        normalization_confidence: extractedResult.entities_confidence
    };

    return result
}

export default normalizetime