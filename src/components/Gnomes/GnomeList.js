import React from 'react';
import GnomeItem from './GnomeItem';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

const list = [];

const getItemByIndex = (index) => {
    return list[index];
}

const GnomeList = () => {

    for (var i = 0; i < 10000; i++) {
        list.push("item " + i);
    }

    return (
        <WindowScroller>
            {({ height, scrollTop }) => (
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <List
                            autoHeight
                            height={height}
                            rowCount={list.length}
                            rowHeight={80}
                            rowRenderer={({ key, index, style }) => GnomeItem({key, index, style, getItemByIndex})}
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