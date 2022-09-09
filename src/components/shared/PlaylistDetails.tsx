import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { fillParent } from "@css/helper";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { text } from "@css/helper/typography";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { X } from "@icon/X";
import { Button } from "./Button";
import { zIndex } from "@css/helper/hierarchy";

const DetailsWrapper = styled.div`
    ${fillParent};
    position: fixed;
    z-index: ${zIndex.popover};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DetailsOverlay = styled.button`
    ${fillParent};
    background-color: rgba(0, 0, 0, 0.6);
`;

const DetailsFrame = styled.div`
    width: 40rem;
    max-width: 100vw;
    padding: 4rem;
    border-radius: 0.8rem;
    background-color: ${p => p.theme.gray100};
`;

const DetailsHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
`;

const DetailsTitle = styled.div`
    ${text("displayXs", "bold")};
`;

const DetailsClose = styled.button`
    color: ${p => p.theme.gray900};
`;

const DetailsForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.2rem;
`;

export interface PlaylistDetailsForm {
    name: string;
    description: string;
}

interface PlaylistDetailsProps {
    name: string;
    description?: string | null;
    onSubmit: (form: PlaylistDetailsForm) => void;
    onClose: () => void;
}

export const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({
    name,
    description,
    onSubmit,
    onClose,
}) => {
    const [form, setForm] = useState<PlaylistDetailsForm>({ name, description: description ?? "" });

    const handleInput = (key: keyof PlaylistDetailsForm, value: string) => {
        setForm(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name) {
            return;
        }

        onSubmit(form);
    };

    return ReactDOM.createPortal(
        <DetailsWrapper>
            <DetailsOverlay type="button" onClick={onClose} aria-hidden />
            <OverlayScrollbarsComponent style={{ maxHeight: "75vh" }}>
                <DetailsFrame>
                    <DetailsHead>
                        <DetailsTitle>Details</DetailsTitle>
                        <DetailsClose
                            type="button"
                            aria-label="Close"
                            title="Close"
                            onClick={onClose}>
                            <X width="16" aria-hidden />
                        </DetailsClose>
                    </DetailsHead>
                    <DetailsForm onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onInput={value => handleInput("name", value)}
                        />
                        <Textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onInput={value => handleInput("description", value)}
                        />
                        <Button as="button" label="Save" />
                    </DetailsForm>
                </DetailsFrame>
            </OverlayScrollbarsComponent>
        </DetailsWrapper>,
        document.body
    );
};
