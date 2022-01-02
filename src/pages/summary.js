import YearSummary from "components/YearSummary";

const Summary = () => {
    return ( 
        <div className="fitwidth">
            <h4>Pengeluaran tiap bulan di tahun {new Date().getFullYear()}</h4>
            <YearSummary />
        </div>
     );
}
 
export default Summary;