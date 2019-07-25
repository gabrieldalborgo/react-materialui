import React from 'react';
import { connect } from 'react-redux';
import GnomeItem from './GnomeItem';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

const GnomeList = ({ data, loading }) => {

    if (loading)
        return (<div>loading...</div>)

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