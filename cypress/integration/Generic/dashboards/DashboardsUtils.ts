export type UxDashboardTreeNodeType = "FOLDER" | "REPORT";

export interface UxDashboardTreeNodeI {

    type: UxDashboardTreeNodeType;

    /**
     * e.g., "/ic3-reporting/data/shared/Live Demo/Charts/Bubble.icc-report"
     */
    docsPath: string;

    /**
     * e.g., "Bubble"
     */
    caption: string;

}

export interface UxDashboardTreeNodeFolder extends UxDashboardTreeNodeI {

    type: "FOLDER";

    children: UxDashboardTreeNode[];

}

export interface UxDashboardTreeNodeReport extends UxDashboardTreeNodeI {

    type: "REPORT";

    /**
     * e.g., "shared:/Live Demo/Charts/Bubble"
     */
    dashboardPath: string;

    /**
     * e.g., "?ic3report=/shared/Live Demo/Charts/Bubble"
     */
    dashboardPermaLINK: string;

}

/**
 * Rest API /console/admin/Dashboards result.
 */
export type UxDashboardTreeNode = UxDashboardTreeNodeFolder | UxDashboardTreeNodeReport;

export interface DashboardInfo {

    caption: string;

    path: string;
    permaLINK: string;

}

export interface DashboardInfos {

    dashboards: DashboardInfo[];

}

function extractDashboardInfoTree(dashboards: DashboardInfo[], json: UxDashboardTreeNodeFolder, only?: string): void {

    const children = json.children;

    children.forEach(node => {

        if (node.type === "FOLDER") {

            extractDashboardInfoTree(dashboards, node, only);

        } else {

            if (only && node.dashboardPath.indexOf(only) === -1) {
                return;
            }

            dashboards.push({
                caption: node.caption,
                path: node.dashboardPath,
                permaLINK: node.dashboardPermaLINK,
            })
        }

    });
}

export function extractDashboardInfos(json: UxDashboardTreeNodeFolder[], only?: string): DashboardInfos {

    const dashboards: DashboardInfo[] = [];

    json.forEach(tree => {
        extractDashboardInfoTree(dashboards, tree, only)
    });

    return {
        dashboards: dashboards.sort((a, b) => a.path.localeCompare(b.path))
    }
}

export type DashboardWidgetRenderType =
    "data-cy-template-render-error" |
    "data-cy-waiting"
    ;

export interface DashboardWidgetStatus {

    widgetId: string;
    renderType: DashboardWidgetRenderType;

}

export interface DashboardStatus {

    ignored?: boolean;

    widgets?: DashboardWidgetStatus[];

}

export type DashboardPath = string;
export type DashboardExpectedStatus = Record<DashboardPath, DashboardStatus>;
