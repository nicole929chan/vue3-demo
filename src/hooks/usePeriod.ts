import moment from "moment"

export default function () {

    function between(start:string, end:string):boolean {
      const today = moment().startOf('day')
      return today.isSameOrAfter(start) && today.isSameOrBefore(end)
    }

    function format(start:string, end:string):string {
      return moment(start).format('YYYY-MM-DD') + ' ~ ' + moment(end).format('YYYY-MM-DD')
    }

    return {
      between,
      format,
    }

}