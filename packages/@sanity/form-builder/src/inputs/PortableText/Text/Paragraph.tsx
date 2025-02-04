import React from 'react'
import styles from './Paragraph.module.css'

interface Props {
  children: React.ReactNode
}

export default function Paragraph(props: Props) {
  return <div className={styles.root}>{props.children}</div>
}
