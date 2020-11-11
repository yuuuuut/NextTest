import { Button, TextField } from "@material-ui/core"
import { Layout } from "../../components/Layout"

const Create = () => {
    return (
        <Layout>
            <div className="container">
                <TextField
                    fullWidth={true}
                    id="outlined-multiline-flexible"
                    label="タイトル"
                    multiline
                    variant="outlined"
                />
                <div className="container-mt">
                    <TextField
                        fullWidth={true}
                        id="outlined-multiline-static"
                        label="本文"
                        multiline
                        rows={5}
                        variant="outlined"
                    />
                </div>
                <div className="container-mt">
                    <Button
                        fullWidth={true}
                        variant="outlined"
                        color="primary"
                    >
                        投稿
                    </Button>
                </div>
            </div>

            <style jsx>{`
                .container {
                    margin: 0 auto;
                    margin-top: 20px;
                    max-width: 400px;
                    padding: 1rem;
                    height: auto;
                    width: calc(100% - 2rem);
                }

                .container-mt {
                    margin-top: 10px;
                }
            `}</style>
        </Layout>
    )
}

export default Create