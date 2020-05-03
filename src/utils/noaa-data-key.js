const NOAADataKey = {
    TideData:{
        values:{
            t:'Time Recorded',
            v:'Water Height',
            s:'Sigma',
            f:'Data Flags',
            q:'Quality Assurance Level',
        },
        valueTranslator:{
            qulityAssurance:{
                p:'Not Yet Verified',
                v:'Verified'
            }
        }
    },
}

export default NOAADataKey