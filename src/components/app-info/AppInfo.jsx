import React from 'react';
import './AppInfo.css'

const AppInfo = ({data}) => {
    const risesEmployees = data.filter(item => item.increase);
    return (
            <div className="app-info">
                <h1>Учет сотрудников компании №</h1>
                <h2>Общее число сотрудников: {data.length}</h2>
                <h2>Премию получат: {risesEmployees.length}</h2>
            </div>
    );
};

export default AppInfo;