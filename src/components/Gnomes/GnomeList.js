import React from 'react';
import GnomeItem from './GnomeItem';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

const GnomeList = (props) => {

    const { data, getItem, showDetail } = props;

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
                            rowRenderer={({ index, style }) => GnomeItem({ index, style, getItem, showDetail})}
                            scrollTop={scrollTop}
                            width={width}
                        />
                    )}
                </AutoSizer>
            )}
        </WindowScroller>
    );
}

export default GnomeList;