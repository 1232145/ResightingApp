import React, { useMemo } from 'react';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const columnConfigs = [
    { title: 'StintID', dataIndex: 'id' },
    { title: 'Obs Init', dataIndex: 'obsInit' },
    { title: 'Island', dataIndex: 'island' },
    { title: 'Location/Blind', dataIndex: 'blind' },
    { title: 'Time Start', dataIndex: 'timeStart' },
    { title: 'Time End', dataIndex: 'timeEnd' },
    { title: 'Date (mm/dd/yy)', dataIndex: 'date' },
    { title: 'Stint Notes', dataIndex: 'stintNotes' },
    { title: 'Species (Alpha)', dataIndex: 'species' },
    { title: 'Time', dataIndex: 'time' },
    { title: 'Loc', dataIndex: 'loc' },
    { title: 'Prox (m)', dataIndex: 'prox' },
    { title: 'Bird Notes', dataIndex: 'birdNotes' },
    { title: 'Band Type', dataIndex: 'type' },
    { title: 'Band Color', dataIndex: 'color' },
    { title: 'Engr. Color', dataIndex: 'engrColor' },
    { title: 'Spec. Feat', dataIndex: 'specFeat' },
    { title: 'Leg (L/R)', dataIndex: 'leg' },
    { title: 'Band Number', dataIndex: 'number' },
    { title: 'Band Wear Present (Y/N) /Wear Score', dataIndex: 'wearScore' },
    { title: 'Read', dataIndex: 'read' },
    { title: 'Confidence', dataIndex: 'confidence' },
];

function PreviewData({ data }) {

    const dataSource = data?.birdDetails.map((detail, index) => ({
        key: index,
        id: data.id,
        obsInit: data.obsInit,
        island: data.island,
        blind: data.blind,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        date: data.date,
        stintNotes: data.stintNotes,
        species: detail.species,
        time: detail.time,
        loc: detail.loc,
        prox: detail.prox,
        birdNotes: detail.birdNotes,
        ...detail.band[0],
        ...detail.band[1],
    })) || [];

    const calculateColumnWidth = (dataIndex, dataSource) => {
        const longestDataLength = dataSource.reduce((max, item) => {
            const length = String(item[dataIndex]).length;
            return length > max ? length : max;
        }, 0);
        return Math.min(200, longestDataLength * 8); // Adjust the multiplier as needed
    };

    const columns = useMemo(() => columnConfigs.map((config) => ({
        ...config,
        key: config.dataIndex,
        width: calculateColumnWidth(config.dataIndex, dataSource),
    })), [dataSource]);

    return (
        <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={3} style={{ marginBottom: '20px' }}>Data Table</Title>
            <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: true }} />
        </div>
    );
}

export default PreviewData;
