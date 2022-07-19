import React from "react";
import styled from "styled-components";
import { Link } from "@lib/link";
import { text } from "@css/helper/typography";
import { hover, square, transition } from "@css/helper";
import { Home } from "@icon/Home";
import { useRouter } from "next/router";
import { Search } from "@icon/Search";
import { Library } from "@icon/Library";
import { Plus } from "@icon/Plus";
import { Heart } from "@icon/Heart";

const ListWrapper = styled.div``;

const ListGroup = styled.ul`
    margin-bottom: 2.8rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ListItem = styled.li``;

const ListAnchor = styled.a<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 0.8rem 2.4rem;
    ${text("textSm", "bold")};
    line-height: 1;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray700)};
    ${transition("color", "0.1s")};

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

const ListIconFrame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${square("2.4rem")};
    border-radius: 0.2rem;
`;

const ListPlus = styled(ListIconFrame)`
    background-color: currentColor;
`;

const ListHeart = styled(ListIconFrame)`
    background: ${p => p.theme.likedSongsGradient};
`;

export const NavigationList: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <ListWrapper>
            <ListGroup>
                <ListItem>
                    <Link href="/" label="Home">
                        <ListAnchor $active={asPath === "/"}>
                            <Home width="24" active={asPath === "/"} />
                            Home
                        </ListAnchor>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/search" label="Search">
                        <ListAnchor $active={asPath === "/search"}>
                            <Search width="24" active={asPath === "/search"} />
                            Search
                        </ListAnchor>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/library" label="Your Library">
                        <ListAnchor $active={asPath === "/library"}>
                            <Library width="24" active={asPath === "/library"} />
                            Your Library
                        </ListAnchor>
                    </Link>
                </ListItem>
            </ListGroup>
            <ListGroup>
                <ListItem>
                    <ListAnchor as="div" $active={asPath === "/gdfd"}>
                        <ListPlus>
                            <Plus width="12" />
                        </ListPlus>
                        Create playlist
                    </ListAnchor>
                </ListItem>
                <ListItem>
                    <Link href="/library/tracks" label="Liked Songs">
                        <ListAnchor $active={asPath === "/library/tracks"}>
                            <ListHeart>
                                <Heart width="12" />
                            </ListHeart>
                            Liked Songs
                        </ListAnchor>
                    </Link>
                </ListItem>
            </ListGroup>
        </ListWrapper>
    );
};
