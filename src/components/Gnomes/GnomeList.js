import React from 'react';
import { connect } from 'react-redux';
import GnomeItem from './GnomeItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import Typography from '@material-ui/core/Typography';

const NoRecords = () => (
    <Typography 
        variant="h6"
        style={{ textAlign: 'center', marginTop: 10}}
    >
        No records
    </Typography>
);

const GnomeList = ({ data, loading }) => {

    if (loading)
        return (<LinearProgress />)
    if (data.length === 0)
        return (<NoRecords/>)
    return (
        <WindowScroller>
            {({ height, scrollTop }) => (
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <List
                            autoHeight
                            height={height}
                            rowCount={data.length}
                            rowHeight={80}
                            rowRenderer={(e) => <GnomeItem {...e} />}
                            scrollTop={scrollTop}
                            width={width}
                        />
                    )}
                </AutoSizer>
            )}
        </WindowScroller>
    );
}

const mapStateToProps = ({ gnomeState }) => ({
    data: gnomeState.list.data,
    loading: gnomeState.list.loading,
});

export default connect(mapStateToProps)(GnomeList);