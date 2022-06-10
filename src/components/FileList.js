import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './FileList.module.css'

const FileList = (props) => {
    const addFile = () => {
        props.setUploads([...props.uploads, {
            offset: 0
        }])
    }

    const uploadFile = (e, i) => {
        const newUploads = [...props.uploads]

        newUploads[i] = {
            ...newUploads[i],
            fileName: e.target.files[0].name,
            obj: e.target.files[0],
        }

        props.setUploads(newUploads)
    }

    const setOffset = (index, newOffset) => {
        const newUploads = [...props.uploads]
        newUploads[index] = {
            ...props.uploads[index],
            offset: newOffset
        }
        props.setUploads(newUploads)
    }

    const deleteFile = (index) => {
        const newUploads = [...props.uploads]
        newUploads.splice(index, 1)
        props.setUploads(newUploads)
    }

    const onlyHex = (e) => {
        const re = /[0-9a-fA-F]+/g
        if (!re.test(e.key)) e.preventDefault()
    }

    return (
        <Box textAlign='center' className={styles.box}>
            { /* File List */}
            <Grid container spacing={.5} className={styles.grid} direction="row" justifyContent="space-around" alignItems="center">

                {/* Offset */}
                <Grid item xs={2}>
                    {props.uploads.map((file, i) =>
                        <div key={i} className={styles.fileItem}>
                            <TextField
                                label='0x'
                                variant='outlined'
                                size='small'
                                value={file.offset}
                                onKeyDown={onlyHex}
                                onChange={(e) => setOffset(i, e.target.value)}
                            />
                        </div>
                    )}
                </Grid>

                {/* File Name */}
                <Grid item xs={9}>
                    {props.uploads.map((file, i) =>
                        <div key={i} className={styles.fileItem}>
                            {file.fileName ?
                                <Typography className={styles.fileName}>
                                    {file.fileName}
                                </Typography>
                                :
                                <Button variant='outlined' color='primary' component='label'>
                                    Select <DriveFolderUploadIcon style={{ paddingLeft: '.2em' }} />
                                    <input
                                        type='file'
                                        hidden
                                        onChange={(e) => uploadFile(e, i)}
                                    />
                                </Button>
                            }
                        </div>
                    )}
                </Grid>

                {/* Delete */}
                <Grid item xs={1}>
                    {props.uploads.map((file, i) =>
                        <div key={i} className={styles.fileItem}>
                            <IconButton
                                color='error'
                                onClick={() => deleteFile(i)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )}
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    { /* Upload new File Button */}
                    <Button color='primary' component='label' size='large' onClick={addFile}>
                        Add <AddBoxIcon style={{ paddingLeft: '.2em' }} />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

FileList.propTypes = {
    uploads: PropTypes.array,
    setUploads: PropTypes.func,
    chipName: PropTypes.string,
}

export default FileList