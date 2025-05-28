import React from 'react'
import ApprovePendingChip from '@/components/chip/chipStatus/ApprovePendingChip'
import ChallengeDeleteChip from '@/components/chip/chipStatus/ChallengeDeleteChip'
import SubmitApproveChip from '@/components/chip/chipStatus/SubmitApproveChip'
import SubmitRejectChip from '@/components/chip/chipStatus/SubmitRejectChip'

export default function AdminStatusChip({status}) {
    switch(status) {
        case 'PENDING':
            return <ApprovePendingChip />
        case 'DELETE': 
            return <ChallengeDeleteChip />
        case 'APPROVE':
            return <SubmitApproveChip />
        case 'REJECT':
            return <SubmitRejectChip />
    }
}