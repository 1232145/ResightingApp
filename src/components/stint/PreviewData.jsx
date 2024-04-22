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
];

const bandColumns = [
    { title: 'Band Start', dataIndex: 'bandStart', key: 'bandStart' },
    { title: 'Band End', dataIndex: 'bandEnd', key: 'bandEnd' },
    { title: 'Band Type', dataIndex: 'type', key: 'type' },
    { title: 'Band Color', dataIndex: 'color', key: 'color' },
    { title: 'Engr. Color', dataIndex: 'engrColor', key: 'engrColor' },
    { title: 'Spec. Feat', dataIndex: 'specFeat', key: 'specFeat' },
    { title: 'Leg (L/R)', dataIndex: 'leg', key: 'leg' },
    { title: 'Band Number', dataIndex: 'number', key: 'number' },
    { title: 'Band Wear Present (Y/N) /Wear Score', dataIndex: 'wearScore', key: 'wearScore' },
    { title: 'Read', dataIndex: 'read', key: 'read' },
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence' },
];

function PreviewData({ data }) {

    const dataSource = data?.birdDetails.map((detail, index) => {
        const band1 = detail.band[0];
        const band2 = detail.band[1];

        return {
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
            bandStart1: band1.bandStart,
            bandEnd1: band1.bandEnd,
            type1: band1.type,
            color1: band1.color,
            engrColor1: band1.engrColor,
            specFeat1: band1.specFeat,
            leg1: band1.leg,
            number1: band1.number,
            wearScore1: band1.wearScore,
            read1: band1.read,
            confidence1: band1.confidence,
            bandStart2: band2.bandStart,
            bandEnd2: band2.bandEnd,
            type2: band2.type,
            color2: band2.color,
            engrColor2: band2.engrColor,
            specFeat2: band2.specFeat,
            leg2: band2.leg,
            number2: band2.number,
            wearScore2: band2.wearScore,
            read2: band2.read,
            confidence2: band2.confidence,
        };
    }) || [];

    const calculateColumnWidth = (dataIndex, dataSource) => {
        const longestDataLength = dataSource.reduce((max, item) => {
            const length = String(item[dataIndex]).length;
            return length > max ? length : max;
        }, 0);
        return Math.min(200, longestDataLength * 8); // Adjust the multiplier as needed
    };

    const combinedColumns = useMemo(() => {
        const mainColumns = columnConfigs.map(config => ({
            ...config,
            key: config.dataIndex,
            width: calculateColumnWidth(config.dataIndex, dataSource),
        }));
        const bandColumns1 = bandColumns.map(column => ({
            ...column,
            dataIndex: `${column.dataIndex}1`,
            key: `${column.key}1`,
            render: (text, record) => record[`${column.dataIndex}1`]
        }));
        const bandColumns2 = bandColumns.map(column => ({
            ...column,
            dataIndex: `${column.dataIndex}2`,
            key: `${column.key}2`,
            render: (text, record) => record[`${column.dataIndex}2`]
        }));

        return [...mainColumns, ...bandColumns1, ...bandColumns2];
    }, [dataSource]);

    return (
        <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={3} style={{ marginBottom: '20px' }}>Data Table</Title>
            <Table dataSource={dataSource} columns={combinedColumns} pagination={false} scroll={{ x: true }} />
        </div>
    );
}

export default PreviewData;
