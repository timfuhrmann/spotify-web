import React from "react";
import styled from "styled-components";
import { PopoverItem } from "./PopoverItem";
import { Popover } from "./Popover";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ChevronBottom } from "@icon/ChevronBottom";

const ListWrapper = styled.div`
    position: relative;
`;

const ListButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1.2rem;
`;

const ListChevron = styled(ChevronBottom)`
    transform: rotate(-90deg);
    width: 1.6rem;
`;

interface ListProps {
    open: boolean;
    label: string;
    options: Record<string, string> | null;
    onSelect: (key: string, value: string) => void;
    onOpen: () => void;
    onClose: () => void;
}

export const PopoverList: React.FC<ListProps> = ({
    open,
    label,
    options,
    onSelect,
    onOpen,
    onClose,
}) => {
    return (
        <ListWrapper>
            <PopoverItem>
                <ListButton onClick={onOpen} onMouseEnter={onOpen}>
                    {label}
                    <ListChevron width="16" aria-hidden />
                </ListButton>
            </PopoverItem>
            {options && open && (
                <Popover placement="right-end" onClose={onClose}>
                    <OverlayScrollbarsComponent style={{ maxHeight: "50vh" }}>
                        {Object.keys(options).map(optionKey => (
                            <PopoverItem key={optionKey}>
                                <ListButton
                                    type="button"
                                    onClick={() => onSelect(optionKey, options[optionKey])}>
                                    {options[optionKey]}
                                </ListButton>
                            </PopoverItem>
                        ))}
                    </OverlayScrollbarsComponent>
                </Popover>
            )}
        </ListWrapper>
    );
};
