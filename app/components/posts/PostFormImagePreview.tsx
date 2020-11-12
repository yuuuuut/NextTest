type PostFormImagePreviewProps = {
    path: string
}

export const PostFormImagePreview = (props: PostFormImagePreviewProps) => {
    return (
        <div>
            <div className="image">
                <img src={props.path} alt="Post Image" />
            </div>

            <style jsx>{`
            .image {
                position: relative;
                overflow: hidden;
                width: 50%
            }

            .image::before {
                content: "";
                display: block;
                padding-top: 50%;
            }

            .image > img {
                position: absolute;
                object-fit: cover;
                object-position: center;
                top: 0;
                left: 0;
                width: 50%;
                height: auto;
            }
            `}</style>
        </div>
    )
}