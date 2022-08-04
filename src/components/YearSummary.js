const YearSummary = ({data, month}) => {
    return ( 
        <div className="summary-month-item box-4">
            <p>{month}</p>
            <label>Rp. {data[month] || '-'}</label>
        </div>
     );
}
 
export default YearSummary;