import React, {PropTypes} from 'react';

import {
	Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle, 
	List, ListItem, Link
} from 'framework7-react';

const LeftPanel = (props, context) => (
	<Panel left reveal layout="dark">
		<View id="left-panel-view" navbarThrough dynamicNavbar="true">
			{context.framework7AppContext.theme.ios ? <Navbar title="Menu"></Navbar> : null}
			<Pages>
				<Page>
					{context.framework7AppContext.theme.material ? <Navbar title="Menu"></Navbar> : null}
					<List>
						<ListItem link="/about/" title="About" linkView="#main-view" linkClosePanel></ListItem>
					</List>
				</Page>
			</Pages>
		</View>
	</Panel>
);

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

export default LeftPanel;