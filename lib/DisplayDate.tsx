import moment from 'moment'

interface DisplayDateProps {
    source: string
    timeZone?: number
    format?: string
}

export default function DisplayDate({source, timeZone, format}: DisplayDateProps){
    const theDate = new Date(source)
    const theFormat = format ? format : "MMMM Do, YYYY [at] h:mma"
    const theTimeZone = timeZone ? timeZone : 8
    return <>{moment(theDate).utcOffset(theTimeZone).format(theFormat)}</>
}
