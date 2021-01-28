import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse


function CheckBox2(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value.name)}
                type="checkbox"
                checked={Checked.indexOf(value.name) === -1 ? false : true}
            />&nbsp;
            <span>{value.name}</span>&nbsp;
        </React.Fragment>
    ))

    return (
        <div style={{width: '100%', margin: '1rem auto'}}>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Tiến trình hoàn thành: " key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox2