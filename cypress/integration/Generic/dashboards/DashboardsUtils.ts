export type UxDashboardTreeNodeKind = "FOLDER" | "FILE";

export interface UxDashboardTreeNodeI {

    kind: UxDashboardTreeNodeKind;

    /**
     * e.g., shared:/Live Demo/Overview
     */
    path: string;

    /**
     * e.g., Overview
     */
    name: string;

}

export interface UxDashboardTreeNodeFolder extends UxDashboardTreeNodeI {

    kind: "FOLDER";

    children?: UxDashboardTreeNode[];

}

export interface UxDashboardTreeNodeReport extends UxDashboardTreeNodeI {

    kind: "FILE";

}

/**
 * Rest API /console/admin/Dashboards result.
 */
export type UxDashboardTreeNode = UxDashboardTreeNodeFolder | UxDashboardTreeNodeReport;

export interface DashboardInfo {

    caption: string;
    path: string;

}

export interface DashboardInfos {

    dashboards: DashboardInfo[];

}

function extractDashboardInfoTree(dashboards: DashboardInfo[], json: UxDashboardTreeNodeFolder, only?: string): void {

    const children = json.children || [];

    children.forEach(node => {

        if (node.kind === "FOLDER") {

            extractDashboardInfoTree(dashboards, node, only);

        } else {

            if (only && node.path.indexOf(only) === -1) {
                return;
            }

            dashboards.push({
                caption: node.name,
                path: node.path,
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
