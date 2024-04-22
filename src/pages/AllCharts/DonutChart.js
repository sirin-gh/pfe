import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class BloodTypeDonutChart extends Component {
    render() {
        const data = {
            columns: [
                ['Type A', 30], // Pourcentage de personnes avec le groupe sanguin A
                ['Type B', 25], // Pourcentage de personnes avec le groupe sanguin B
                ['Type AB', 15], // Pourcentage de personnes avec le groupe sanguin AB
                ['Type O', 30] // Pourcentage de personnes avec le groupe sanguin O
            ],
            type: "donut",
        };

        const donut = {
            title: "Répartition",
            width: 30,
            label: { show: false }
        };

        const color = {
            pattern: ['#f0f1f4', '#7a6fbe', '#28bbe3', '#ff7f0e'] // Couleurs pour chaque groupe sanguin
        };

        const size = {
            height: 300
        };

        return (
            <React.Fragment>
                <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />
            </React.Fragment>
        );
    }
}

export default BloodTypeDonutChart;
