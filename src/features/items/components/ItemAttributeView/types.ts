export type ItemAttributeViewProps = {
    label: string;
    values: string | string[];
};

export type ItemAttributeActionViewProps = {
    label: string;
    values: string | string[];
    onAction: (value: string) => void;
};
