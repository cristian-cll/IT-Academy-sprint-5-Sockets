import moment from 'moment';


export const getTime = ( date: Date ) => {
    return  moment( date ).format('HH:mm a | MMMM Do');
}
