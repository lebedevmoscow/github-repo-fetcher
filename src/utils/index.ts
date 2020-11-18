import moment from 'moment'

/**
 * Format ISO 8601 Date to date MM/DD/YYYY
 * @param {string} date - String, ISO 8601 Date 
 */
export const formatDate = (date: string) => {
    return moment(date, moment.ISO_8601).format('l')
}