import dates from 'compromise-dates'
import nlp from "compromise";

nlp.extend(dates);

const extractEntities = async (parsedText) => {
    const ocrText = parsedText.raw_text
    const departmentList = ['dentist', 'cardiology', 'orthopedics', 'pediatrics', 'reception'];
    const plugin = {
        words: {
            ...departmentList.reduce((obj, dep) => {
                obj[dep] = 'Department';
                return obj;
            }, {})
        }
    };
    nlp.plugin(plugin);

    const doc = nlp(ocrText);

    const timePhrase = doc.match('(at|around|on|@) #Time+').out('text');
    let datePhrase = doc.dates().first().text();

    if (datePhrase && timePhrase) {
        datePhrase = datePhrase.replace(timePhrase, '').trim();
    }

    const department = doc.match('#Department').text();

    let confidence = parsedText.confidence
    if (!datePhrase) confidence -= 0.3;
    if (!timePhrase) confidence -= 0.3;
    if (!department) confidence -= 0.4;

    confidence = Math.max(0, confidence);

    const result = {
        entities: {
            date_phrase: datePhrase || "",
            time_phrase: timePhrase || "",
            department: department || "",
        },
        entities_confidence: parseFloat(confidence.toFixed(2)),
    };

    return result
}


export default extractEntities
