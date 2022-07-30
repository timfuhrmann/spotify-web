import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { text } from "@css/helper/typography";
import { Search } from "@icon/Search";
import { X } from "@icon/X";
import { useSearchInput } from "@lib/hook/useSearchInput";

const SearchWrapper = styled.div`
    flex: 1 1 0;
`;

const SearchFrame = styled.form`
    position: relative;
    max-width: 37rem;
    color: ${p => p.theme.gray50};
    pointer-events: auto;
`;

const SearchIcon = styled(Search)`
    position: absolute;
    top: 50%;
    left: 2.4rem;
    transform: translate(-50%, -50%);
    width: 2.4rem;
`;

const SearchReset = styled.button`
    position: absolute;
    top: 50%;
    right: 2.4rem;
    transform: translate(50%, -50%);
    display: none;
`;

const SearchInput = styled.input`
    height: 4rem;
    padding: 0 4.8rem;
    background-color: ${p => p.theme.gray900};
    border-radius: 2rem;
    border: none;
    width: 100%;
    ${text("textSm")}

    &:not(:placeholder-shown) + ${SearchReset} {
        display: flex;
    }
`;

export const HeaderSearch: React.FC = () => {
    const { prefetch } = useRouter();
    const { value, setValue } = useSearchInput();

    return (
        <SearchWrapper>
            <SearchFrame role="search" onSubmit={e => e.preventDefault()}>
                <SearchIcon aria-hidden />
                <SearchInput
                    type="text"
                    value={value}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    placeholder="Artists, Songs or Albums"
                    onInput={e => setValue((e.target as HTMLInputElement).value)}
                    onFocus={() => prefetch("/browse/search")}
                />
                <SearchReset type="button" aria-label="Reset search" onClick={() => setValue("")}>
                    <X width="24" />
                </SearchReset>
            </SearchFrame>
        </SearchWrapper>
    );
};
