import moment from 'moment-timezone';

interface DisplayDateProps {
    source?: string
    timeZone?: any
    format?: string
}

export default function DisplayDate({source, timeZone, format}: DisplayDateProps){
    // dayjs.extend(require('dayjs/plugin/timezone'))
    // const guessTimezone = dayjs.tz.guess()

    const theDate = source ? new Date(source) : new Date()
    const theFormat = format ? format : "MMMM Do, YYYY [at] h:mma"
    const theTimeZone = timeZone ? timeZone : moment.tz.guess() as any
    // utcOffset(theTimeZone)
    return <>{moment(theDate).tz(theTimeZone).format(theFormat)}</>
}
